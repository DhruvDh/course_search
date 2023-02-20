import { animate, stagger } from 'motion'
import { Component, createEffect, For, mergeProps } from 'solid-js'
import { SubtitleItem } from '../types'

interface TimelineProps {
  items: SubtitleItem[]
  staggerStart: number
}

const Timeline: Component<TimelineProps> = (props) => {
  const { items, staggerStart } = mergeProps(
    {
      items: [
        {
          start: '00:00:00,000',
          url: 'https://youtu.be/1aGKHCzpAwE?t=780',
          text: 'sample subtitle text'
        }
      ],
      staggerStart: 0
    },
    props
  )

  const idPrefix = `timeline-${Math.random().toString(6)}`

  createEffect(() => animate(document.querySelectorAll(`[id^='${idPrefix}']`), { opacity: [0, 1] }, { delay: stagger(0.15, { start: staggerStart }) }))

  return (
    <ol class="border-l border-gray-300 ">
      <For each={items}>
        {(item, i) => {
          return (
            <li class="" id={`${idPrefix}-${i()}`}>
              <div class="flex flex-start items-center pt-3">
                <div class=" bg-emerald-600 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <a class="text-base text-green-600" href={item.url}>
                  {item.start}
                </a>
              </div>
              <div class="mt-0.5 ml-4 mb-6">
                <a class="text-base text-green-600" href={item.url}>
                  <p class="text-gray-500 mb-3" innerHTML={item.text}></p>
                </a>
              </div>
            </li>
          )
        }}
      </For>
    </ol>
  )
}

export default Timeline
