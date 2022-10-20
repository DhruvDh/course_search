import { Presence, Motion } from "@motionone/solid";
import { Component, createEffect, For, Show } from "solid-js";
import { mergeProps } from "solid-js";
import VideoResultCard from "./VideoResultCard";

interface SearchHit {
  start: string;
  url: string;
  _formatted: {
    title: string;
    text: string;
  };
}

interface SearchResultsProps {
  hits: () => SearchHit[];
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const { hits } = mergeProps({ hits: () => new Array<SearchHit>() }, props);
  const videoResults = () => {
    const videoResults = [];
    const videoMap = {};

    for (const hit of hits()) {
      const res = {
        start: hit.start,
        text: hit._formatted.text,
        url: hit.url,
      };

      const title = hit._formatted.title;
      if (videoMap.hasOwnProperty(title)) {
        videoMap[title].push(res);
      } else {
        videoMap[title] = [res];
      }
    }

    for (const [key, values] of Object.entries(videoMap)) {
      videoResults.push({
        title: key,
        results: values,
      });
    }

    return videoResults;
  };

  return (
    <div class="flex flex-initial justify-center flex-wrap gap-6 py-6 px-6 h-[80vh] max-h-[80vh]">
      <For each={videoResults()}>
        {(result, i) => {
          return (
            <VideoResultCard
              index={i}
              title={result.title}
              results={result.results}
            />
          );
        }}
      </For>
    </div>
  );
};

export default SearchResults;
