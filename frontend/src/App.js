import React, { useState } from "react";
import SignIn from "./components/Login";
import SignUp from "./components/Register";
import Order from "./components/Order";

function App() {
  const [register, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Order />
      ) : (
        register ? (
          <SignUp setRegister={setRegister} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SignIn setRegister={setRegister} setIsLoggedIn={setIsLoggedIn} />
        )
      )}
    </div>
  );
}

export default App;
