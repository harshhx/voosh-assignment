import React, { useEffect, useState } from "react";
import SignIn from "./components/Login";
import SignUp from "./components/Register";
import Order from "./components/Order";
import axios from "axios";

function App() {
  const [register, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);


  useEffect(() => {
    axios
      .get('http://localhost:5000/getProfile', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('id', res.data._id);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
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
