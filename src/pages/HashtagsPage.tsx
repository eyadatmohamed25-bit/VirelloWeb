import { Hash } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { GeneratorPanel, type RenderProps } from '@/components/GeneratorPanel';
import { ResultCard } from '@/components/ResultCard';
import { CopyButton } from '@/components/CopyButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { generateHashtags, type HashtagItem } from '@/lib/generator';

export function HashtagsPage() {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-brand-500/10 p-3 ring-1 ring-brand-500/20">
            <Hash className="h-6 w-6 text-brand-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.tools.hashtags}</h1>
            <p className="text-sm text-slate-400">{t.features.hashtagsDesc}</p>
          </div>
        </div>
      </div>

      <GeneratorPanel tool="hashtags" resultTitle={t.form.results} generator={generateHashtags}>
        {({ data, save, isSaved }: RenderProps) => {
          const result = data as HashtagItem;
          const allText = result.hashtags.join(' ');
          return (
            <ResultCard onSave={() => save(data, 'hashtags')} saved={isSaved('hashtags')} actions={<CopyButton text={allText} />}>
              <h3 className="font-bold text-white">{t.tools.hashtags}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-sm font-medium text-brand-300 transition-colors hover:bg-brand-500/20"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </ResultCard>
          );
        }}
      </GeneratorPanel>
    </DashboardLayout>
  );
}
