import type { ReactNode } from 'react';
import { Bookmark } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ResultCard({
  children,
  onSave,
  saved = false,
  actions,
}: {
  children: ReactNode;
  onSave?: () => void;
  saved?: boolean;
  actions?: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <div className="glass card-hover rounded-2xl p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">{children}</div>
        {onSave && (
          <button
            onClick={onSave}
            disabled={saved}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              saved
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-current' : ''}`} />
            {saved ? t.form.saved : t.form.save}
          </button>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 pt-2">{actions}</div>}
    </div>
  );
}
