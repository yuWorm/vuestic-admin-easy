import { createI18n } from 'vue-i18n'

// 定义语言模块的类型
type LanguageModule = {
  [key: string]: string | LanguageModule
}

// 定义语言数据的类型
type Languages = {
  [lang: string]: LanguageModule
}

const languages: Languages = {}

const languagesModules: Record<string, { default: LanguageModule }> = import.meta.glob('./locales/*/*.ts', {
  eager: true,
})

Object.entries(languagesModules).forEach(([k, m]) => {
  const lang = k.split('/')[2]
  if (!(lang in languages)) {
    languages[lang] = {}
  }
  const moduleData = m.default
  Object.assign(languages[lang], moduleData)
})

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'cn',
  fallbackLocale: 'cn',
  messages: languages,
})
