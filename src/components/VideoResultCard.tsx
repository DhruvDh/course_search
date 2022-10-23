import { Component, mergeProps } from 'solid-js'
import Timeline from './Timeline'
import { SubtitleItem } from '../types'

interface VideoResultCardProps {
  index: () => number
  title: string
  results: SubtitleItem[]
}

const VideoResultCard: Component<VideoResultCardProps> = (props) => {
  const { index, title, results } = mergeProps(
    {
      index: () => 0,
      title: 'Missing title',
      results: new Array<SubtitleItem>()
    },
    props
  )

  return (
    <div
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
  )
}

export default VideoResultCard
