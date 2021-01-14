import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Login from "../../../components/Login/Login";

configure({ adapter: new Adapter() });

describe("<Login />", () => {
  let wrapper;
  let componentRef;

  it("onLogin must be called when login happens", () => {
    let spy1 = jest.fn();
    let spy2 = jest.fn();

    wrapper = mount(<Login onUsernameChange={spy1} onLogin={spy2} />);

    componentRef = wrapper.find("Login");

    // console.log(componentRef.debug());

    componentRef.find("input.login__username").simulate("change", { target: { value: "Raquel" } });

    componentRef.find("button.login__login-btn").simulate("click");

    componentRef = wrapper.find("Login");

    expect(componentRef.find(".alert").length).toBe(1);

    // console.log(spy1.mock.calls);

    expect(spy1.mock.calls[1][0]).toBe("Raquel2");
  });
});
