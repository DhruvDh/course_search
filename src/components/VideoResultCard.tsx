import { Component, createEffect, mergeProps } from 'solid-js'
import Timeline from './Timeline'
import { SubtitleItem } from '../types'
import { animate, stagger } from 'motion'

interface VideoResultCardProps {
  index: () => number
  title: string
  results: SubtitleItem[]
  staggerStart: number
}

const VideoResultCard: Component<VideoResultCardProps> = (props) => {
  const { index, title, results, staggerStart } = mergeProps(
    {
      index: () => 0,
      title: 'Missing title',
      results: new Array<SubtitleItem>(),
      staggerStart: 0
    },
    props
  )

  createEffect(() => {
    const res = document.querySelectorAll("[id^='video-result-card-']")
    if (results.length !== 0) {
      animate(res, { opacity: [0, 1] }, { delay: stagger(0.15) })
    }
  })

  return (
    <div
      id={`video-result-card-${index()}`}
      class={'border-dashed border-2 rounded-3xl overflow-y-auto'}
    >
      <div class="p-6 rounded-3xl bg-white-50 max-w-sm  max-h-96">
        <h5
          class="text-gray-700 text-xl font-medium mb-2 mr-44"
          innerHTML={title}
        ></h5>
        <Timeline items={results} staggerStart={staggerStart} />
      </div>
    </div >
  )
}

export default VideoResultCard
