import { A } from "@solidjs/router";
import { Component } from "solid-js";
import CenteredH1 from "../components/CenteredH1";

const SelectIndex: Component = () => {
  return (
    <CenteredH1>
      <>
        No index selected. Try navigating to{" "}
        <A href="/cs50" class="text-green-300">
          /cs50
        </A>
        .{" "}
      </>
    </CenteredH1>
  );
};

export default SelectIndex;
