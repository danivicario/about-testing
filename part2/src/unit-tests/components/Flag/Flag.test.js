import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import configureMockStore from "redux-mock-store";
import Flag from "../../../components/Flag/Flag";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<Flag />", () => {
  let wrapper;
  let componentRef;

  const mockStore = configureMockStore();
  const storeStateMock = {};

  beforeEach(async () => {});

  it("checking basic props get properly applied", () => {
    [
      "AR",
      "ZH",
      "EN",
      "FR",
      "DE",
      "ID",
      "IT",
      "JA",
      "KO",
      "PL",
      "PT",
      "RU",
      "ES",
      "TR",
      "VI"
    ].forEach((country) => {
      wrapper = mount(<Flag country={country}></Flag>);

      componentRef = wrapper.find("Flag");
      expect(componentRef.find("img").prop("src")).toBe(`${country}.svg`);
      expect(componentRef.find("img").prop("alt")).toBe(`${country} flag`);
      expect(componentRef.find("span").text()).toBe(`${country}`);
    });

    wrapper = mount(<Flag country={["country 1", "country 2"]}></Flag>);

    componentRef = wrapper.find("Flag");
    expect(componentRef.find("img").prop("src")).toBe(`multi.svg`);
    expect(componentRef.find("img").prop("alt")).toBe(`country 1, country 2 flag`);
    expect(componentRef.find("span").text()).toBe(`country 1, country 2`);
  });
});
