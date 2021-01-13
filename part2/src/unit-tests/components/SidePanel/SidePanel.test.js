import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import SidePanel from "../../../components/SidePanel/SidePanel";

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

describe("<SidePanel />", () => {
  let wrapper;
  let rootRef;

  it("checking component renders", () => {
    wrapper = mount(<SidePanel></SidePanel>);

    rootRef = wrapper.find(".modal");

    expect(rootRef.length).toBe(1);
  });

  it("close button must work", () => {
    wrapper = mount(<SidePanel></SidePanel>);

    rootRef = wrapper.find(".modal");

    rootRef.find(".modal-header__back").simulate("click");

    expect(mockDispatch.mock.calls[0][0].type).toBe("HIDE_SIDE_PANEL");
  });

  it("when title gets passed it must be shown", () => {
    wrapper = mount(<SidePanel title={"test title"}></SidePanel>);

    rootRef = wrapper.find(".modal");

    expect(rootRef.find(".modal-title").at(0).text()).toBe("test title");
  });

  it("when title doesn't get passed it must not be shown", () => {
    wrapper = mount(<SidePanel></SidePanel>);

    rootRef = wrapper.find(".modal");

    expect(rootRef.find(".modal-title").length).toBe(0);
  });
});
