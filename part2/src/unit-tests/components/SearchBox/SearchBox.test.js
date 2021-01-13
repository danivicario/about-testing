import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Searchbox from "../../../components/SearchBox/SearchBox";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<Searchbox />", () => {
  let wrapper;
  let searchBoxRef;
  let filterTerm = "Polish";

  function searchOnChange(e) {
    filterTerm = e;
  }

  function wrapperUpdate() {
    wrapper = mount(
      <Searchbox
        filterTerm={filterTerm}
        searchOnChange={searchOnChange}
        placeholder="Search by course name"
      ></Searchbox>
    );
  }

  beforeEach(async () => {
    wrapperUpdate();

    searchBoxRef = wrapper.find(".search-box");
  });

  it("filter term appears in the input box", () => {
    expect(searchBoxRef.find(".search-box__filter").at(0).prop("value")).toBe(filterTerm);
  });

  it("filter term dissapears when the cross button is clicked", () => {
    searchBoxRef.find(".search-box__icon-close").at(0).simulate("click");

    wrapperUpdate();

    searchBoxRef = wrapper.find(".search-box");
    expect(searchBoxRef.find(".search-box__filter").at(0).prop("value")).toBe("");
  });

  it("filter term gets passed to this component parent when typed", () => {
    searchBoxRef
      .find(".search-box__filter")
      .at(0)
      .simulate("change", { target: { value: "Spanish" } });

    wrapperUpdate();

    searchBoxRef = wrapper.find(".search-box");
    expect(searchBoxRef.find(".search-box__filter").at(0).prop("value")).toBe("Spanish");
    expect(filterTerm).toBe("Spanish");
  });
});
