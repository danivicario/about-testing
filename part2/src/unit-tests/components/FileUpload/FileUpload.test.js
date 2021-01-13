import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import FileUpload from "../../../components/FileUpload/FileUpload";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<FileUpload />", () => {
  let wrapper;
  let baseRef;
  let store;
  const mockStore = configureMockStore();

  it("FileUpload appears with its basic html", () => {
    const storeStateMock = {};
    store = mockStore(storeStateMock);

    wrapper = mount(
      <Provider store={store}>
        <FileUpload></FileUpload>
      </Provider>
    );

    baseRef = wrapper.find(".file-upload");
    expect(baseRef.length).toBeGreaterThan(0);
    expect(baseRef.find("img").prop("src")).toContain("upload");
    expect(baseRef.find("figcaption").text()).toContain("Upload image");
  });
});
