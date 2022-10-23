import { useParams } from "@solidjs/router";
import {
  Component,
  createResource,
  createSignal,
  Match,
  Show,
  Switch,
} from "solid-js";
import CenteredH1 from "../components/CenteredH1";
import MainSearch from "../components/MainSearch";
import SearchResults from "../components/SearchResults";
import { MeiliSearchError, MeiliSearchResults, SearchHit } from "../types";

const fetchResults = async (
  searchVal: string
): Promise<MeiliSearchResults | MeiliSearchError> => {
  const params = useParams();
  const index = params.index;
  if (searchVal.length === 0) {
    return {
      hits: [],
      offset: 0,
      limit: 0,
      processingTimeMs: 0,
      query: "",
      estimatedTotalHits: 0,
    };
  }

  return (await (
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
        highlightPreTag: '<em class="text-green-700">',
        highlightPostTag: "</em>",
      }),
    })
  ).json()) as MeiliSearchResults | MeiliSearchError;
};

const Search: Component = () => {
  const [mainSearchVal, setMainSearchVal] = createSignal("");
  const [searchResults] = createResource(mainSearchVal, fetchResults);
  const hits = (): SearchHit[] => {
    const result = searchResults() ?? { hits: [] };
    if ("hits" in result) {
      return result.hits;
    } else {
      return [];
    }
  };

  const errorMessage = (): string | undefined => {
    const result = searchResults() ?? { hits: [] };

    if ("message" in result) {
      return result.message;
    } else {
      return undefined;
    }
  };

  return (
    <>
      <MainSearch setSearchVal={setMainSearchVal} />
      <Switch>
        <Match when={errorMessage() !== undefined}>
          <CenteredH1 text={errorMessage()} />
        </Match>
        <Match when={hits().length === 0}>
          <CenteredH1 text="No results found." />
        </Match>
        <Match when={hits().length > 0}>
          <SearchResults hits={hits} />
        </Match>
      </Switch>
    </>
  );
};

export default Search;
