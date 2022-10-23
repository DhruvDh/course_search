import { createMotion } from "@motionone/solid";
import { Component, onMount, mergeProps } from "solid-js";
import { spring } from "motion";
import Timeline from "./Timeline";
import { SubtitleItem } from "../types";

interface VideoResultCardProps {
  index: () => number;
  title: string;
  results: SubtitleItem[];
}

const VideoResultCard: Component<VideoResultCardProps> = (props) => {
  let ref!: HTMLDivElement;
  const { index, title, results } = mergeProps(
    {
      index: () => 0,
      title: "Missing title",
      results: new Array<SubtitleItem>(),
    },
    props
  );

  onMount(() => {
    createMotion(ref, {
      initial: { opacity: 0, y: 60 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.15, easing: spring() },
      },
      exit: {
        opacity: 0,
        y: 60,
        transition: { duration: 0.15, easing: spring() },
      },
    });
  });

  return (
    <div
      ref={ref}
      class={`flex flex-initial border-dashed border-2 rounded-3xl overflow-y-auto   order-${index()}`}
    >
      <div class="p-6 rounded-3xl bg-white-50 max-w-sm  max-h-96">
        <h5
          class="text-gray-700 text-xl font-medium mb-2 mr-44"
          innerHTML={title}
        ></h5>
        <Timeline items={results} />
      </div>
    </div>
  );
};

export default VideoResultCard;
