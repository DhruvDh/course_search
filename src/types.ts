export interface SubtitleItem {
  start: string
  url: string
  text: string
}

export interface SearchHit {
  start: string
  url: string
  _formatted: {
    title: string
    text: string
  }
}

export interface VideoResults {
  title: string
  results: SubtitleItem[]
}

export interface MeiliSearchResults {
  hits: SearchHit[]
  'offset': number
  'limit': number
  'estimatedTotalHits': number
  'processingTimeMs': number
  'query': string
}
