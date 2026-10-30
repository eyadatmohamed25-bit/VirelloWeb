import { useLanguage } from '@/i18n/LanguageContext';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { lang } = useLanguage();
  const dims = { sm: 'h-8', md: 'h-9', lg: 'h-11' }[size];
  const text = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${dims} aspect-square relative shrink-0`}>
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
          <rect width="64" height="64" rx="16" fill="#0b0b16" />
          <path d="M18 16h6l8 22 8-22h6L38 48h-8L18 16z" fill="url(#logo-grad)" />
          <circle cx="48" cy="20" r="4" fill="#22d3ee" />
          <defs>
            <linearGradient id="logo-grad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9b74ff" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className={`${text} font-display font-bold tracking-tight text-white`}>
        {lang === 'ar' ? 'فيريلو' : 'Virello'}
      </span>
    </div>
  );
}
