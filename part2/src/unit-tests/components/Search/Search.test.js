import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Search from "../../../components/Search/Search";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<Search />", () => {
  let wrapper;
  let searchRef;
  let store;

  function searchOnChange(e) {
    filterTerm = e;
  }

  const mockStore = configureMockStore();

  const storeStateMock = {
    courses: {
      searchResultsMock: [{ id: 1, name: "complete English" }]
    },
    search: {
      searchTerm: "test",
      searchType: { name: "Lesson Id", code: "1" }
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
      },
      panels: {
        metadata: {
          visible: false
        },
        comments: {
          visible: false
        },
        course: {
          visible: false
        },
        search: {
          visible: true
        }
      }
    }
  };

  function wrapperUpdate() {
    store = mockStore(storeStateMock);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Search className="search--big"></Search>
        </Provider>
      </BrowserRouter>
    );
  }

  beforeEach(async () => {
    wrapperUpdate();

    searchRef = wrapper.find(".search");
  });

  it("search is present", () => {
    expect(searchRef.length).toBeGreaterThan(0);
  });

  it("expect search to appear", () => {
    searchRef.find(".search-box__filter input").at(0).simulate("click");
    searchRef = wrapper.find(".search");
    expect(searchRef.find(".search-modal").length).toBeGreaterThan(0);
  });
});
