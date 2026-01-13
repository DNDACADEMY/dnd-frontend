import { type Metadata } from 'next'

import { ORIGIN_URL } from '../constants'

const title = 'DND - 지원 결과 조회'
const description = 'DND는 개발자와 디자이너라면 누구나 참여할 수 있는 IT비영리단체입니다.'
const images = [{ url: '/assets/logos/og-thumbnail.png' }]

// CI/개발 환경에서 환경변수가 없을 때 기본값 사용
const baseUrl = ORIGIN_URL || 'https://dnd.ac'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: baseUrl,
    images
  },
  twitter: {
    title,
    description,
    images
  }
}
