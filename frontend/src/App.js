import { useState } from "react";
import SignIn from "./components/Login";
import SignUp from "./components/Register";

function App() {
  const [register, setRegister] = useState(true);
  return <div className="App">{register ? <SignUp setRegister={setRegister} /> : <SignIn setRegister={setRegister}/>}</div>;
}

export default App;
