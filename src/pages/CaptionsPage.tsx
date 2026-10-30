import { MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { GeneratorPanel, type RenderProps } from '@/components/GeneratorPanel';
import { ResultCard } from '@/components/ResultCard';
import { CopyButton } from '@/components/CopyButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { generateCaptions, type CaptionItem } from '@/lib/generator';

export function CaptionsPage() {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-accent-500/10 p-3 ring-1 ring-accent-500/20">
            <MessageSquare className="h-6 w-6 text-accent-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.tools.captions}</h1>
            <p className="text-sm text-slate-400">{t.features.captionsDesc}</p>
          </div>
        </div>
      </div>

      <GeneratorPanel tool="captions" resultTitle={t.form.results} generator={generateCaptions}>
        {({ data, save, isSaved }: RenderProps) => {
          const captions = data as CaptionItem[];
          const allText = captions.map((c, i) => `${i + 1}. ${c.caption}`).join('\n\n');
          return (
            <>
              <div className="flex justify-end">
                <CopyButton text={allText} />
              </div>
              {captions.map((item, i) => (
                <ResultCard
                  key={i}
                  onSave={() => save({ caption: item.caption }, `captions-${i}`)}
                  saved={isSaved(`captions-${i}`)}
                  actions={<CopyButton text={item.caption} />}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-xs font-bold text-accent-400">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{t.tools.captions}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.caption}</p>
                </ResultCard>
              ))}
            </>
          );
        }}
      </GeneratorPanel>
    </DashboardLayout>
  );
}
