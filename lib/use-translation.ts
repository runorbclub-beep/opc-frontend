import { useLocaleStore } from './locale-store';
import { t, type Locale } from './i18n';

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale);

  return {
    locale,
    t: (key: string, ...params: any[]) => t(locale, key, ...params),
  };
}
