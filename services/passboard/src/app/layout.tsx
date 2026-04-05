import '../styles/globals.css'
import { ClientOnlyProviders } from '../providers/ClientOnlyProviders'
import { pretendard } from '../styles/fonts/pretendard'
import '@dds/desktop/desktop.css'

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
        {children}
        <ClientOnlyProviders />
      </body>
    </html>
  )
}
