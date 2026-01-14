import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

import type { NextConfig } from 'next'

import { ORIGIN_URL } from '@/shared/constants'
const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: ORIGIN_URL
      }
    ]
  },
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'))

    config.resolve.alias.canvas = false

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
}

export default withVanillaExtract(nextConfig)
