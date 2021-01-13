import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent, useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import "../../scss/main.scss";
import Flag, { FlagModes } from "../Flag/Flag";

function App() {
  let [userName, setUsername] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [error1, setError1] = useState<string>("");
  let [error2, setError2] = useState<string>("");

  function login() {
    if (userName.length === 0) {
      setError1("Username too short");
    }

    if (password.length === 0) {
      setError2("Password too short");
    }
  }

  return (
    <div className="App">
      <div className="login">
        <Form.Control
          type="text"
          placeholder="Enter email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          value={userName}
        />
        {error1 && (
          <Alert variant="danger" dismissible>
            {error1}
          </Alert>
        )}

        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {error2 && (
          <Alert variant="danger" dismissible>
            {error2}
          </Alert>
        )}
        <Row className="flex w-100 justify-content-between">
          <Flag country={"EN"} mode={FlagModes.countryNameAfter} />
          <Button onClick={() => login()}>Login</Button>
        </Row>
      </div>
    </div>
  );
}

export default App;
