import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { actImmediate } from "../../utils";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<Dropdown />", () => {
  let wrapper;
  let store;
  let dropdownRef;

  const mockStore = configureMockStore();
  const storeStateMock = {};
  let mockDropdownValues;

  beforeEach(async () => {
    store = mockStore(storeStateMock);
    mockDropdownValues = [
      {
        name: "fake 1",
        code: "1"
      },
      {
        name: "fake 2",
        code: "99"
      }
    ];

    wrapper = mount(
      <Provider store={store}>
        <Dropdown
          title="test-title"
          id="test-id"
          className="test-className"
          values={mockDropdownValues}
        ></Dropdown>
      </Provider>
    );

    dropdownRef = wrapper.find("DropdownButton");
  });

  it("checking basic props get properly applied", async () => {
    expect(dropdownRef.prop("className")).toBe("test-className");
    expect(dropdownRef.prop("id")).toBe("test-id");
    expect(dropdownRef.prop("title")).toBe("test-title");
  });

  it("dropdown must present provided values when clicked", () => {
    const dropdownToggleRef = dropdownRef.find("DropdownToggle Button");

    dropdownToggleRef.simulate("click");

    actImmediate(wrapper).catch((e) => {});

    dropdownRef = wrapper.find("DropdownButton");
    expect(dropdownRef.find("DropdownMenu DropdownItem").at(0).text()).toBe(
      mockDropdownValues[0].name
    );

    expect(dropdownRef.find("DropdownMenu DropdownItem").at(1).text()).toBe(
      mockDropdownValues[1].name
    );
  });

  it("dropdown must present provided values when clicked", () => {
    const dropdownToggleRef = dropdownRef.find("DropdownToggle Button");

    dropdownToggleRef.simulate("click");

    dropdownRef = wrapper.find("DropdownButton");
    let dropdownItemOnClick = dropdownRef.find("DropdownMenu DropdownItem").at(1).simulate("click");

    dropdownRef = wrapper.find("DropdownButton");
    let selectedDropdownElementRef = wrapper.find("DropdownButton .dropdown-toggle.btn");

    expect(selectedDropdownElementRef.text()).toBe(mockDropdownValues[1].name);
  });
});
