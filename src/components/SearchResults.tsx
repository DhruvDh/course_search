import { Component, For, mergeProps } from "solid-js";
import VideoResultCard from "./VideoResultCard";
import { SubtitleItem, SearchHit, VideoResults } from "../types";

interface SearchResultsProps {
  hits: () => SearchHit[];
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const { hits } = mergeProps({ hits: () => new Array<SearchHit>() }, props);
  const videoResults: () => VideoResults[] = () => {
    const videoResults = new Array<VideoResults>();
    const videoMap = new Map<string, SubtitleItem[]>();

    for (const hit of hits()) {
      const res: SubtitleItem = {
        start: hit.start,
        text: hit._formatted.text,
        url: hit.url,
      };

      const title = hit._formatted.title;
      const val = videoMap.get(title);
      if (val != null) {
        val.push(res);
      } else {
        videoMap.set(title, [res]);
      }
    }

    for (const [key, values] of videoMap.entries()) {
      values.sort((lhs, rhs) => {
        const l = Date.parse(`2022-10-22 ${lhs.start}`);
        const r = Date.parse(`2022-10-22 ${lhs.start}`);

        return l - r;
      });

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
