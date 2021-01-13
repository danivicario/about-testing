import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";

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

describe("<BaseContent />", () => {
  let wrapper;
  let baseRef;
  let store;
  const mockStore = configureMockStore();

  const storeStateMock = {};

  beforeEach(async () => {
    store = mockStore(storeStateMock);

    window.testDelete = function () {};
    window.showMetadata = function () {};
    window.showComments = function () {};

    jest.mock().spyOn(window, "testDelete");
    jest.mock().spyOn(window, "showMetadata");
    jest.mock().spyOn(window, "showComments");

    wrapper = mount(
      <Provider store={store}>
        <ContextMenu
          items={[
            { name: "Delete", onClick: () => window.testDelete() },
            { name: "Show metadata", onClick: () => window.showMetadata() },
            { name: "Show comments", onClick: () => window.showComments() }
          ]}
        ></ContextMenu>
      </Provider>
    );

    baseRef = wrapper.find(".context-menu").at(0);
  });

  it("checking basic props get properly applied", () => {
    baseRef.find("Button").simulate("click");
    baseRef = wrapper.find(".context-menu").at(0);
    expect(baseRef.find("DropdownItem").length).toBe(3);

    baseRef.find("DropdownItem").at(0).simulate("click");

    expect(window.testDelete).toHaveBeenCalled();
  });
});
