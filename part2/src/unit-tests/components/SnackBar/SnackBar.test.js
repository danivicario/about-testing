import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { SnackBar, SnackBarDissapear, SnackBarTypes } from "../../../components/SnackBar/SnackBar";
import { store as mockedStore } from "../../../redux/store";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<SnackBar />", () => {
  let wrapper;
  let baseRef;
  let store;
  const mockStore = configureMockStore();

  it("snackbar appears with its basic html", () => {
    const storeStateMock = {
      ui: {
        SnackBar: {
          visible: true,
          type: SnackBarTypes.warning,
          title: "test title",
          body: "test body"
        }
      }
    };
    store = mockStore(storeStateMock);

    wrapper = mount(
      <Provider store={store}>
        <SnackBar></SnackBar>
      </Provider>
    );

    baseRef = wrapper.find(".snack-bar");

    expect(baseRef.prop("className")).toContain("snack-bar--warning");
    expect(baseRef.prop("className")).toContain("snack-bar--visible");
    expect(baseRef.find(".snack-bar__title").text()).toBe(storeStateMock.ui.SnackBar.title);
    expect(baseRef.find(".snack-bar__body-text").text()).toBe(storeStateMock.ui.SnackBar.body);
  });

  it("checking snack bar won't be shown when visible in the store is set to false", () => {
    const storeStateMock = {
      ui: {
        SnackBar: {
          visible: false
        }
      }
    };
    store = mockStore(storeStateMock);

    wrapper = mount(
      <Provider store={store}>
        <SnackBar></SnackBar>
      </Provider>
    );

    baseRef = wrapper.find(".snack-bar");
    expect(baseRef.prop("className")).not.toContain("snack-bar--visible");
  });

  it("checking SnackBarDissapear works", () => {
    jest.spyOn(window, "setTimeout");
    jest.spyOn(mockedStore, "dispatch");

    SnackBarDissapear();
    expect(window.setTimeout).toHaveBeenCalled();

    const setTimeoutCall = window.setTimeout.mock.calls[0][0];

    setTimeoutCall();

    expect(mockedStore.dispatch).toHaveBeenCalledWith({
      type: "HIDE_SNACKBAR"
    });
  });
});
