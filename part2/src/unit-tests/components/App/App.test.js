import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../components/App/App.js";
import { store } from "../../../redux/store";
import { actImmediate } from "../../utils";

configure({ adapter: new Adapter() });

const mockDispatch = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch
}));

describe("<App />", () => {
  let wrapper;
  let rootRef;

  beforeEach(() => {
    window.location = "/course/1";
    wrapper = mount(
      <BrowserRouter match={{ params: { course: 1 }, isExact: true, path: "/course/1", url: "" }}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    rootRef = wrapper.find(".App");
  });

  it("Course table filters must be present", () => {
    let searchRef = wrapper.find(".search");
    let dashboardSectionRef = wrapper.find(".page-dashboard");

    expect(searchRef.length).toBe(1);
    expect(dashboardSectionRef.at(0).length).toBe(1);
  });

  it("create a new course button must call to the SHOW_COURSE_PANEL action", async () => {
    await actImmediate(wrapper, async () => {
      let courseButtonRef = rootRef.find(".App__new-course-dropdown").at(0).find("button");
      courseButtonRef.simulate("click");

      rootRef = wrapper.find(".App");
      rootRef.find(".App__create-new-course button").at(0).simulate("click");

      expect(mockDispatch.mock.calls[2][0].type).toBe("SHOW_COURSE_PANEL");
    });
  });
});
