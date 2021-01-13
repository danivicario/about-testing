import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "../../scss/main.scss";
import Header from "../Header/Header";
import Login from "../Login/Login";

export type Username = string | undefined;

function App() {
  let [username, setUsername] = useState<Username>(undefined);
  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <Header
        username={username === undefined ? "Anonymous" : username}
        photo={
          loggedIn
            ? "https://media-exp1.licdn.com/dms/image/C4E03AQHh0h8Q18T3Mg/profile-displayphoto-shrink_800_800/0/1604659391367?e=1616025600&v=beta&t=wuDou842XRDtk017X52gl_q0cWN30EdbLrES-rK3vA8"
            : "https://www.marinasmediterraneo.com/marinaseste/wp-content/uploads/sites/4/2018/09/generic-user-purple-4.png"
        }
      />
      {!loggedIn && (
        <Login
          onLogin={(loggedIn: boolean) => setLoggedIn(loggedIn)}
          onUsernameChange={(username: Username) => setUsername(username)}
        />
      )}
      {loggedIn && (
        <Alert variant="success" className="w-50">
          <Alert.Heading>Logged In!</Alert.Heading>
          <p>Cool, you are in</p>
        </Alert>
      )}
    </div>
  );
}

export default App;
