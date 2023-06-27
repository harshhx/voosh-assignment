import React, { useEffect, useState } from "react";
import SignIn from "./components/Login";
import SignUp from "./components/Register";
import Order from "./components/Order";
import axios from "axios";

function App() {
  const [register, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [getProfile, setGetProfile] = useState(false);

  useEffect(() => {
    setGetProfile(!getProfile);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getProfile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("id", res.data._id);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, [getProfile]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Order setIsLoggedIn={setIsLoggedIn} setGetProfile={setGetProfile} getProfile={getProfile}/>
      ) : register ? (
        <SignUp setRegister={setRegister} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SignIn setRegister={setRegister} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
