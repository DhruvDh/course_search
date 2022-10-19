import { Component, For } from "solid-js";
import { mergeProps } from "solid-js";

const Timeline: Component = (props) => {
  const { items } = mergeProps(
    {
      items: [
        {
          start: "00:00:00,000",
          url: "https://youtu.be/1aGKHCzpAwE?t=780",
          text: "sample subtitle text",
        },
      ],
    },
    props
  );

  return (
    <ol class="border-l border-gray-300 snap-y snap-mandatory ">
      <For each={items}>
        {(item, i) => {
          return (
            <li class="snap-always snap-start">
              <div class="flex flex-start items-center pt-3">
                <div class="bg-emerald-600 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <a class="text-base text-green-600" href={item.url}>
                  {item.start}
                </a>
              </div>
              <div class="mt-0.5 ml-4 mb-6">
                <p class="text-gray-500 mb-3" innerHTML={item.text}></p>
              </div>
            </li>
          );
        }}
      </For>
    </ol>
  );
};

export default Timeline;
