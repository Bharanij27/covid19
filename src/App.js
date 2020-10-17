import React, { Fragment } from "react";
import Covid from "./components/Covid";
import "./App.css";
import AppTitle from "./components/AppTitle";

function App() {
  return (
    <Fragment>
      <AppTitle />
      <Covid />
    </Fragment>
  );
}

export default App;
