import { A } from "@solidjs/router";
import { Component } from "solid-js";

const SelectIndex: Component = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="text-6xl font-light font-sans  text-gray-300">
        No index selected. Try navigating to{" "}
        <A href="/cs50" class="text-green-300">
          /cs50
        </A>
        .
      </div>
    </div>
  );
};

export default SelectIndex;
