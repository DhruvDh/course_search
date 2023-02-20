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
  staggerStart: number
}

export interface MeiliSearchResults {
  hits: SearchHit[]
  'offset': number
  'limit': number
  'estimatedTotalHits': number
  'processingTimeMs': number
  'query': string
}

export interface MeiliSearchError {
  message: string
  code: number
  type: 'invalid_request' | 'internal' | 'auth'
  link: string
}
