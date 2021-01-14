import "bootstrap/dist/css/bootstrap.min.css";
import React, { FunctionComponent } from "react";
import "../../scss/main.scss";

interface HeaderProps {
  username: string;
  photo: string;
}

const Header: FunctionComponent<HeaderProps> = ({ username, photo }: HeaderProps) => {
  return (
    <div className="header w-100 row flex justify-content-between">
      <span>{username}</span>
      <img src={photo} alt="User" />
    </div>
  );
};

export default Header;
