import "./App.css";
import React from "react";
import "./App.css";

import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { Topbar } from "./components/Topbar";
import { DashBoard } from "./pages/DashBoard";
function App() {
  return (
    <>
     <Signup></Signup>
     {/* <Signin></Signin> */}
     {/* <SendMoney></SendMoney> */}
     {/* <DashBoard></DashBoard> */}
    </>
  );
}

export default App;
