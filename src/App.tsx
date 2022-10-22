import { Route, Routes } from "@solidjs/router";
import { Component } from "solid-js";
import Search from "./layout/Search";
import SelectIndex from "./layout/SelectIndex";

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/:index" component={Search} />
        <Route path="/" component={SelectIndex} />
      </Routes>
    </>
  );
};

export default App;
