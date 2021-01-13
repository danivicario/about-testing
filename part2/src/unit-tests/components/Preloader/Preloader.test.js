import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Preloader from "../../../components/Preloader/Preloader";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<Preloader />", () => {
  let wrapper;
  let baseElementRef;

  it("checking basic props get properly applied", () => {
    wrapper = mount(<Preloader></Preloader>);

    baseElementRef = wrapper.find(".preloader");

    expect(baseElementRef.find("svg").length).toBe(1);
  });
});
