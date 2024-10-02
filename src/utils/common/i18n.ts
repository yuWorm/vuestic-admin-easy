import { useI18n } from 'vue-i18n'

export function tr(name: string): string {
  /*
   * 主要给不在setup下面的代码调用
   * */
  const { t } = useI18n()
  return t(name)
}
