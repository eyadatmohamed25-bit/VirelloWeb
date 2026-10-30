import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageSwitcher() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
