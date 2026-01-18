/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_MOCK_ENABLED: 'enabled' | 'disabled'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
