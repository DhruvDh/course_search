import { useParams } from "@solidjs/router";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import MainSearch from "../components/MainSearch";
import SearchResults from "../components/SearchResults";

const fetchResults = async (searchVal) => {
  const params = useParams();
  const index = params.index;
  if (searchVal === undefined) {
    return undefined;
  } else if (searchVal.length === 0) {
    return undefined;
  } else {
    return (
      await fetch(`https://apisearch.dhruvdh.com/indexes/${index}/search`, {
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

const Search: Component = () => {
  const [mainSearchVal, setMainSearchVal] = createSignal();
  const [searchResults] = createResource(mainSearchVal, fetchResults);
  const hits = () => {
    if (
      searchResults() !== undefined &&
      searchResults().hasOwnProperty("hits")
    ) {
      return searchResults().hits;
    } else {
      return [];
    }
  };

  const errorMessage = () => {
    if (
      searchResults() !== undefined &&
      searchResults().hasOwnProperty("code")
    ) {
      return searchResults().message;
    }

    return undefined;
  };
  const ErrorMessage = (
    <div class="font-light font-sans text-6xl text-center px-6 py-6">
      {errorMessage()}
    </div>
  );

  const NoResults = (
    <div class="font-light font-sans text-6xl text-center px-6 py-6">
      "No results found."
    </div>
  );
  return (
    <>
      <MainSearch setSearchVal={setMainSearchVal} />
      <Show when={errorMessage() !== undefined}>{ErrorMessage}</Show>
      <Show when={hits().length > 0 && errorMessage() === undefined}>
        <SearchResults hits={hits} />
      </Show>
    </>
  );
};

export default Search;
