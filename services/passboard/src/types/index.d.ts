namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_ORIGIN_URL: string
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_MOCKING_ENABLED: string

    NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY: string
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: string
  }
}
