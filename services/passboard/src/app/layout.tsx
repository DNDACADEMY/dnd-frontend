import '@/shared/styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'

import { ChannelIo } from '@/shared/components/common/ChannelIo'
import { GOOGLE_TAG_MANAGER_ID } from '@/shared/constants'
import { pretendard } from '@/shared/styles/fonts/pretendard'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={pretendard.variable}
      lang='ko'>
      <head>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/assets/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/assets/favicon-16x16.png'
        />
      </head>
      <body>
        <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
        <ChannelIo />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
