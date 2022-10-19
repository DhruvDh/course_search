import { Component, createResource, createSignal, For, Show } from "solid-js";
import MainSearch from "./components/MainSearch";
import SearchResults from "./components/SearchResults";
import VideoResultCard from "./components/VideoResultCard";

const fetchResults = async (searchVal: string) => {
  if (searchVal.length === 0) {
    return undefined;
  } else {
    return (
      await fetch("https://apisearch.dhruvdh.com/indexes/subtitles/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 1b279499e580e057004fa6463935cd542464f1a4044f6e9bbe4537af169a6b83",
        },
        body: JSON.stringify({
          q: searchVal,
          attributesToHighlight: ["title", "text"],
          highlightPreTag: `<em class="text-green-700">`,
          highlightPostTag: "</em>",
        }),
      })
    ).json();
  }
};

const App: Component = () => {
  const [mainSearchVal, setMainSearchVal] = createSignal();
  const [searchResults] = createResource(mainSearchVal, fetchResults);
  const hits = () => {
    if (searchResults() === undefined) {
      return [];
    } else if (searchResults().loading || searchResults().error) {
      return [];
    } else {
      return searchResults().hits;
    }
  };
  return (
    <>
      <MainSearch setSearchVal={setMainSearchVal} />
      <Show when={searchResults() && searchResults().hasOwnProperty("hits")}>
        <Show
          when={hits().length == 0}
          fallback={<SearchResults hits={hits} />}
        >
          <div class="font-light font-sans text-6xl text-center px-6 py-6">
            No results found.
          </div>
        </Show>
      </Show>
    </>
  );
};

export default App;
