/// <reference types="vite/client" />

interface ImportMetaEnv {
  [key: string]: any
  VITE_IS_HASH_ROUTER: string
  VITE_BASE_API: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
