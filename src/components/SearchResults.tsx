import { Component, createEffect, For, mergeProps } from 'solid-js'
import VideoResultCard from './VideoResultCard'
import { SubtitleItem, SearchHit, VideoResults } from '../types'
import { animate, stagger } from 'motion'

interface SearchResultsProps {
  hits: () => SearchHit[]
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const { hits } = mergeProps({ hits: () => new Array<SearchHit>() }, props)
  const videoResults: () => VideoResults[] = () => {
    const videoResults = new Array<VideoResults>()
    const videoMap = new Map<string, SubtitleItem[]>()

    for (const hit of hits()) {
      const res: SubtitleItem = {
        start: hit.start,
        text: hit._formatted.text,
        url: hit.url
      }

      const title = hit._formatted.title
      const val = videoMap.get(title)
      if (val != null) {
        val.push(res)
      } else {
        videoMap.set(title, [res])
      }
    }

    for (const [key, values] of videoMap.entries()) {
      values.sort((lhs, rhs) => {
        const l = lhs.start.split(':').map((x) => parseInt(x))
        const r = rhs.start.split(':').map((x) => parseInt(x))

        return (
          l[0] * 3600 + l[1] * 60 + l[2] - (r[0] * 3600 + r[1] * 60 + r[2])
        )
      })

      videoResults.push({
        title: key,
        results: values
      })
    }

    videoResults.sort((lhs, rhs) => {
      return rhs.results.length - lhs.results.length
    })

    return videoResults
  }

  createEffect(() => {
    if (videoResults().length !== 0) {
      animate(document.querySelectorAll("[id^='video-result-card-']"), { opacity: [0, 1] }, { delay: stagger(0.15) })
    }
  })

  return (
    <div class="flex flex-row flex-wrap justify-center  gap-6 py-6 px-6 h-[78vh] max-h-[78vh]">
      <For each={videoResults()}>
        {(result, i) => {
          return (
            <VideoResultCard
              index={i}
              title={result.title}
              results={result.results}
            />
          )
        }}
      </For>
    </div >
  )
}

export default SearchResults
