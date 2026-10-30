import { Lightbulb } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { GeneratorPanel, type RenderProps } from '@/components/GeneratorPanel';
import { ResultCard } from '@/components/ResultCard';
import { CopyButton } from '@/components/CopyButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { generateIdeas, type IdeaItem } from '@/lib/generator';

export function IdeasPage() {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-brand-500/10 p-3 ring-1 ring-brand-500/20">
            <Lightbulb className="h-6 w-6 text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.tools.ideas}</h1>
            <p className="text-sm text-slate-400">{t.features.ideasDesc}</p>
          </div>
        </div>
      </div>

      <GeneratorPanel tool="ideas" resultTitle={t.form.results} generator={generateIdeas}>
        {({ data, save, isSaved }: RenderProps) => {
          const ideas = data as IdeaItem[];
          const allText = ideas.map((i, n) => `${n + 1}. ${i.title}\n   ${i.hook}`).join('\n\n');
          return (
            <>
              <div className="flex justify-end">
                <CopyButton text={allText} />
              </div>
              {ideas.map((idea, i) => (
                <ResultCard
                  key={i}
                  onSave={() => save({ idea }, `ideas-${i}`)}
                  saved={isSaved(`ideas-${i}`)}
                  actions={<CopyButton text={`${idea.title}\n\n${idea.description}\n\nHook: ${idea.hook}`} />}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-300">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-white">{idea.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{idea.description}</p>
                  <div className="mt-3 rounded-lg border border-brand-500/15 bg-brand-500/5 px-3 py-2">
                    <p className="text-xs text-slate-300">
                      <span className="font-semibold text-brand-300">{t.form.hook}:</span> {idea.hook}
                    </p>
                  </div>
                </ResultCard>
              ))}
            </>
          );
        }}
      </GeneratorPanel>
    </DashboardLayout>
  );
}
