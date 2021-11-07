import React from "react";
import "./App.css";
import Routes from "./common/router/Routes";
import Nav from "./components/nav";

function App() {
  return (
    <>
      <Nav></Nav>
      <Routes />
    </>
  );
}

export default App;
