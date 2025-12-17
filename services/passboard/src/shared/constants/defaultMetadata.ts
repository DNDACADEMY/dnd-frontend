import { type Metadata } from 'next'

import { ORIGIN_URL } from '../constants'

const title = 'DND - 지원 결과 조회'
const description = 'DND는 개발자와 디자이너라면 누구나 참여할 수 있는 IT비영리단체입니다.'
const images = [{ url: '/assets/logos/og-thumbnail.png' }]

export const defaultMetadata: Metadata = {
  metadataBase: new URL(ORIGIN_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: ORIGIN_URL,
    images
  },
  twitter: {
    title,
    description,
    images
  }
}
