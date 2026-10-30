import { CalendarDays, Clock, Lightbulb } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { GeneratorPanel, type RenderProps } from '@/components/GeneratorPanel';
import { ResultCard } from '@/components/ResultCard';
import { CopyButton } from '@/components/CopyButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { generatePlanner, type PlannerItem } from '@/lib/generator';

export function PlannerPage() {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-ocean-500/10 p-3 ring-1 ring-ocean-500/20">
            <CalendarDays className="h-6 w-6 text-ocean-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.tools.planner}</h1>
            <p className="text-sm text-slate-400">{t.features.plannerDesc}</p>
          </div>
        </div>
      </div>

      <GeneratorPanel tool="planner" resultTitle={t.form.results} generator={generatePlanner}>
        {({ data, save, isSaved }: RenderProps) => {
          const plan = data as PlannerItem;
          const allText = plan.days.map((d) => `${d.day}: ${d.topic} (${d.format}) — ${d.postTime}\nTip: ${d.tip}`).join('\n\n');
          return (
            <ResultCard onSave={() => save(data, 'planner')} saved={isSaved('planner')} actions={<CopyButton text={allText} />}>
              <div className="space-y-3">
                {plan.days.map((day, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-brand-500/20"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-ocean-500/10 text-xs font-bold text-brand-300">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-white">{day.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="chip border-ocean-500/20 bg-ocean-500/10 text-ocean-300">
                          <Clock className="h-3 w-3" />
                          {day.postTime}
                        </span>
                        <span className="chip">{day.format}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-200">{day.topic}</p>
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-brand-500/5 px-3 py-2">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                      <p className="text-xs text-slate-400">{day.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ResultCard>
          );
        }}
      </GeneratorPanel>
    </DashboardLayout>
  );
}
