import '../styles/globals.css'
import { ClientOnlyProviders } from '../providers/ClientOnlyProviders'
import { MSWProvider } from '../providers/MSWProvider'

import '@dds/desktop/desktop.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
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
        <MSWProvider>{children}</MSWProvider>
        <ClientOnlyProviders />
      </body>
    </html>
  )
}
