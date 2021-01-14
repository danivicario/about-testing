import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Login from "../../../components/Login/Login";

configure({ adapter: new Adapter() });

describe("<Login />", () => {
  let wrapper;
  let componentRef;

  let x = () => {};
  let y = () => {};

  it("checking basic props get properly applied", () => {
    wrapper = mount(<Login onUsernameChange={x} onLogin={y} />);

    componentRef = wrapper.find("Login");
    expect(1).toBe(1);
  });

  it("onLogin must be called when login happens", () => {
    componentRef.get(".login__username").simu("hola");
  });
});
