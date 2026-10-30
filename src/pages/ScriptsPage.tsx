import { Video, Clapperboard } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { GeneratorPanel, type RenderProps } from '@/components/GeneratorPanel';
import { ResultCard } from '@/components/ResultCard';
import { CopyButton } from '@/components/CopyButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { generateScript, type ScriptItem } from '@/lib/generator';

export function ScriptsPage() {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-ocean-500/10 p-3 ring-1 ring-ocean-500/20">
            <Video className="h-6 w-6 text-ocean-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.tools.scripts}</h1>
            <p className="text-sm text-slate-400">{t.features.scriptsDesc}</p>
          </div>
        </div>
      </div>

      <GeneratorPanel tool="scripts" resultTitle={t.form.results} generator={generateScript}>
        {({ data, save, isSaved }: RenderProps) => {
          const script = data as ScriptItem;
          const fullText = `${t.form.hook}:\n${script.hook}\n\n${t.form.mainScript}:\n${script.body}\n\n${t.form.scenes}:\n${script.scenes.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${t.form.cta}:\n${script.cta}`;
          return (
            <ResultCard
              onSave={() => save(data, 'scripts')}
              saved={isSaved('scripts')}
              actions={<CopyButton text={fullText} />}
            >
              <h3 className="font-bold text-white">{script.title}</h3>

              <div className="mt-4 rounded-xl border border-brand-500/15 bg-brand-500/5 p-4">
                <p className="text-xs font-semibold text-brand-300">{t.form.hook}</p>
                <p className="mt-1 text-sm text-slate-200">{script.hook}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400">{t.form.mainScript}</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-200">{script.body}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400">{t.form.scenes}</p>
                <ul className="mt-2 space-y-2">
                  {script.scenes.map((scene, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <Clapperboard className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
                      <span>{scene}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-xl border border-ocean-500/15 bg-ocean-500/5 p-4">
                <p className="text-xs font-semibold text-ocean-400">{t.form.cta}</p>
                <p className="mt-1 text-sm text-slate-200">{script.cta}</p>
              </div>
            </ResultCard>
          );
        }}
      </GeneratorPanel>
    </DashboardLayout>
  );
}
