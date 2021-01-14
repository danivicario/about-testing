import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Login from "../../../components/Login/Login";

configure({ adapter: new Adapter() });

describe("<Login />", () => {
  let wrapper;
  let componentRef;

  it("onLogin must be called when login happens", () => {
    let x = jest.fn();
    let y = jest.fn();

    wrapper = mount(<Login onUsernameChange={x} onLogin={y} />);

    componentRef = wrapper.find("Login");

    componentRef.find("input.login__username").simulate("change", { target: { value: "Hello" } });
    componentRef.find("button.login__login-btn").simulate("click");

    componentRef = wrapper.find("Login");

    expect(componentRef.find(".alert").length).toBe(1);
    expect(x.mock.calls[1][0]).toBe("Hello");
  });
});
