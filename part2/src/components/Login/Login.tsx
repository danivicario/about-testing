import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import "../../scss/main.scss";
import Flag, { FlagModes } from "../Flag/Flag";

const Login: FunctionComponent = () => {
  let [userName, setUsername] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [error1, setError1] = useState<string | null>(null);
  let [error2, setError2] = useState<string | null>(null);
  let [userLanguage, setUserLanguage] = useState<"EN" | "ES">("EN");

  function login() {
    if (userName.length === 0) {
      setError1("Username too short");
    }

    if (password.length === 0) {
      setError2("Password too short");
    }
  }

  return (
    <div className="login">
      <Form.Control
        type="text"
        placeholder="Enter email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        value={userName}
      />
      {error1 && (
        <Alert variant="danger" dismissible onClose={() => setError1(null)}>
          {error1}
        </Alert>
      )}

      <Form.Control
        type="password"
        placeholder="Enter password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      {error2 && (
        <Alert variant="danger" dismissible onClose={() => setError2(null)}>
          {error2}
        </Alert>
      )}
      <Row className="flex w-100 justify-content-between">
        <Flag
          country={userLanguage}
          mode={FlagModes.countryNameAfter}
          onClick={() => {
            userLanguage === "EN" ? setUserLanguage("ES") : setUserLanguage("EN");
          }}
        />
        <Button onClick={() => login()}>Login</Button>
      </Row>
    </div>
  );
};

export default Login;
