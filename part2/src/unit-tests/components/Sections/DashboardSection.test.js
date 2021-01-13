import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import DashboardSection from "../../../components/Sections/DashboardSection";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch
}));

describe("<DashboardSection />", () => {
  let wrapper;
  let DashboardSectionRef;
  let store;
  const mockStore = configureMockStore();

  let storeStateMock;

  storeStateMock = {
    courses: {
      allCourses: {
        loaded: true,
        courses: [
          { id: "1", name: "Complete English" },
          { id: "99", name: "Complete French" },
          { id: "199", name: "Complete German" },
          { id: "34399", name: "Complete Spanish" }
        ]
      }
    },
    ui: {
      SnackBar: {
        visible: false
      },
      ContextMenu: {
        visible: false,
        x: undefined,
        y: undefined
      },
      CoursesTable: {
        field: "name",
        ascending: true
      },
      SearchTable: {
        field: "name",
        ascending: true
      }
    }
  };

  it("checking basic section elements are present in the section container", () => {
    store = mockStore(storeStateMock);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardSection></DashboardSection>
        </Provider>
      </BrowserRouter>
    );

    DashboardSectionRef = wrapper.find(".page-dashboard").at(0);

    expect(DashboardSectionRef.find("CoursesTable").length).toBe(1);
  });

  it("checking dispatch to request all the courses to the saga are made", () => {
    let storeStateMock2 = JSON.parse(JSON.stringify(storeStateMock));
    storeStateMock2.courses.allCourses.loaded = false;
    store = mockStore(storeStateMock2);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardSection></DashboardSection>
        </Provider>
      </BrowserRouter>
    );

    DashboardSectionRef = wrapper.find(".page-dashboard").at(0);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "ALL_COURSES_REQUEST" });
  });

  it("checking if the right courses are provided to the CoursesTable subcomponent (when having more than one course)", () => {
    store = mockStore(storeStateMock);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardSection></DashboardSection>
        </Provider>
      </BrowserRouter>
    );

    DashboardSectionRef = wrapper.find(".page-dashboard").at(0);

    expect(DashboardSectionRef.find("CoursesTable").prop("content")).toEqual(
      storeStateMock.courses.allCourses.courses
    );
  });

  it("checking if the CoursesTable subcomponent is not rendered when no courses are being provided to it", () => {
    store = mockStore(storeStateMock);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardSection></DashboardSection>
        </Provider>
      </BrowserRouter>
    );

    DashboardSectionRef = wrapper.find(".page-dashboard").at(0);

    const noCoursesStoreStateMock = JSON.parse(JSON.stringify(storeStateMock));

    noCoursesStoreStateMock.courses.allCourses = [];

    store = mockStore(noCoursesStoreStateMock);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardSection></DashboardSection>
        </Provider>
      </BrowserRouter>
    );

    DashboardSectionRef = wrapper.find(".page-dashboard");

    expect(DashboardSectionRef.find("CoursesTable").length).toEqual(0);
  });
});
