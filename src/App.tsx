import { Route, Routes, useParams } from "@solidjs/router";
import { Component } from "solid-js";
import Search from "./layout/Search";

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/:index" component={Search} />
      </Routes>
    </>
  );
};

export default App;
