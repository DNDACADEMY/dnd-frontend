'use client'

import { useEffect } from 'react'
import * as ChannelService from '@channel.io/channel-web-sdk-loader'
import { CHANNEL_IO_PLUGIN_KEY, IS_DEV } from '@/shared/constants'

export const ChannelIo = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || IS_DEV) return
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: CHANNEL_IO_PLUGIN_KEY
    })
  }, [])

  return null
}
