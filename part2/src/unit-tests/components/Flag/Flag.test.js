import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Flag from "../../../components/Flag/Flag";

configure({ adapter: new Adapter() });

describe("<Flag />", () => {
  let wrapper;
  let componentRef;

  it("checking basic props get properly applied", () => {
    ["ES", "EN"].forEach((country) => {
      wrapper = mount(<Flag country={country} />);

      componentRef = wrapper.find("Flag");
      expect(componentRef.find("img").prop("src")).toBe(`${country}.svg`);
      expect(componentRef.find("img").prop("alt")).toBe(`${country}`);
      expect(componentRef.find("span").text()).toBe(`${country}`);
    });
  });
});
