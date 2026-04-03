'use client'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'
import { useEffect } from 'react'

import { CHANNEL_IO_PLUGIN_KEY } from '../../constants'
import { IS_DEV } from '../../constants'

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
