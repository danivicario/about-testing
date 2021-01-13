import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import CoursesTable from "../../../components/Tables/CoursesTable";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("Tables", () => {
  describe("<CoursesTable />", () => {
    let wrapper;
    let store;
    let CoursesTableRef;

    const mockStore = configureMockStore();
    const storeStateMock = {
      courses: {
        allCourses: {
          loaded: true,
          courses: [
            {
              id: "1",
              name: "Complete Japanese",
              courseLanguage: "EN",
              interfaceLanguage: "PL",
              img: 1
            },
            {
              id: "99",
              name: "Complete French",
              courseLanguage: "ES",
              interfaceLanguage: "FR",
              img: null
            }
          ]
        }
      },
      ui: {
        CoursesTable: {
          field: "name",
          ascending: true
        }
      }
    };

    beforeEach(() => {
      store = mockStore(storeStateMock);

      wrapper = mount(
        <BrowserRouter>
          <Provider store={store}>
            <CoursesTable
              orderByField={storeStateMock.ui.CoursesTable}
              content={storeStateMock.courses.allCourses.courses}
            ></CoursesTable>
          </Provider>
        </BrowserRouter>
      );

      CoursesTableRef = wrapper.find("CoursesTable");
    });

    it("checking sub components are present", () => {
      expect(CoursesTableRef.find(`FormControl`).prop(`placeholder`)).toBe("Filter by course name");
      expect(CoursesTableRef.find(`Dropdown`).length).toBe(2);
      expect(CoursesTableRef.find(`Dropdown`).at(0).text()).toBe("Course language");
      expect(CoursesTableRef.find(`Dropdown`).at(1).text()).toBe("Interface language");
      // expect(CoursesTableRef.find(`Link`).length).toBe(2);
      expect(CoursesTableRef.find(`.search-box`).length).toBe(1);
    });

    it("checking contents are populated properly from the store", () => {
      const rowWithFakeCourse1 = CoursesTableRef.find(`tbody tr`).at(1);
      const linkOfFakeCourse1 = rowWithFakeCourse1.find("Link");
      const rowWithFakeCourse2 = CoursesTableRef.find(`tbody tr`).at(0);
      const linkOfFakeCourse2 = rowWithFakeCourse2.find("Link");

      // results should be provided in reverse order as the courses table is autosorted on load
      expect(linkOfFakeCourse1.text()).toBe(storeStateMock.courses.allCourses.courses[1].name);
      expect(linkOfFakeCourse1.prop("to")).toBe("/course/99");
      expect(rowWithFakeCourse1.find(".course-language").text()).toBe("ES");
      expect(rowWithFakeCourse1.find(".interface-language").text()).toBe("FR");
    });

    it("checking filtering", () => {
      const searchBoxDOMEl = CoursesTableRef.find(`.search-box`);
      let filterDOMEl = searchBoxDOMEl.find("FormControl .search-box__filter");
      filterDOMEl.simulate("change", { target: { value: "French" } });

      filterDOMEl = searchBoxDOMEl.find("FormControl .search-box__filter");
      CoursesTableRef = wrapper.find("CoursesTable");

      const filteredRows = CoursesTableRef.find(`tbody tr`);

      expect(filteredRows.length).toBe(1);
      expect(filteredRows.find("Link").prop("to")).toBe(`/course/99`);
    });

    it("images should be rendered correctly - when no image is provided we must render a placeholder", () => {
      const firstImage = CoursesTableRef.find(".courses-table__course-image").at(0);
      const secondImage = CoursesTableRef.find(".courses-table__course-image").at(1);

      expect(firstImage.prop("src")).toContain("enc_complete_1.png");
      expect(secondImage.prop("src")).toContain("placeholder-image.png");
    });
  });
});
