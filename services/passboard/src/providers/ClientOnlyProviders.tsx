'use client'

import dynamic from 'next/dynamic'

import { GOOGLE_TAG_MANAGER_ID } from '../shared/constants'

const GoogleTagManager = dynamic(() => import('@next/third-parties/google').then((m) => m.GoogleTagManager), { ssr: false })
const ChannelIo = dynamic(() => import('../shared/components/common/ChannelIo').then((m) => m.ChannelIo), { ssr: false })
const Analytics = dynamic(() => import('@vercel/analytics/next').then((m) => m.Analytics), { ssr: false })

export function ClientOnlyProviders() {
  return (
    <>
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      <ChannelIo />
      <Analytics />
    </>
  )
}
