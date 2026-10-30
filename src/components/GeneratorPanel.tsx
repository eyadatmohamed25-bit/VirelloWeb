import { useState, type ReactNode } from 'react';
import { Sparkles, Info } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';

type GenInput = {
  niche: string;
  platform: string;
  audience: string;
  language: 'en' | 'ar';
  tone: string;
};

export type RenderProps = {
  data: unknown;
  save: (data: unknown) => Promise<void>;
  isSaved: (key: string) => boolean;
};

export type GenConfig = {
  tool: string;
  resultTitle: string;
  showNiche?: boolean;
  showTone?: boolean;
  children: (props: RenderProps) => ReactNode;
  generator: (input: GenInput) => unknown;
};

export function GeneratorPanel({ tool, resultTitle, showNiche = true, showTone = true, children, generator }: GenConfig) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('all');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('energetic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setSavedKeys(new Set());
    await new Promise((r) => setTimeout(r, 900));
    const data = generator({ niche, platform, audience, language: lang, tone });
    setResult(data);
    setLoading(false);
  };

  const save = async (data: unknown, key?: string) => {
    if (!user) {
      toast(t.toasts.loginRequired, 'error');
      return;
    }
    const saveKey = key ?? tool;
    const { error } = await supabase.from('saved_content').insert({
      tool,
      title: serializeTitle(data, tool, lang),
      content: data as Record<string, unknown>,
      platform,
      language: lang,
    });
    if (error) {
      toast(t.toasts.error, 'error');
    } else {
      toast(t.toasts.saved);
      setSavedKeys((prev) => new Set(prev).add(saveKey));
    }
  };

  const isSaved = (key: string) => savedKeys.has(key);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* Form panel */}
      <div className="glass rounded-2xl p-6 h-fit lg:sticky lg:top-20">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-400" />
          <h2 className="font-display text-lg font-bold text-white">{t.form.generate}</h2>
        </div>

        <div className="space-y-4">
          {showNiche && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.form.niche}</label>
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder={t.form.nichePlaceholder}
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.form.platform}</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="input-field">
              <option value="all">{t.platforms.all}</option>
              <option value="tiktok">{t.platforms.tiktok}</option>
              <option value="instagram">{t.platforms.instagram}</option>
              <option value="youtube">{t.platforms.youtube}</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.form.audience}</label>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder={t.form.audiencePlaceholder}
              className="input-field"
            />
          </div>

          {showTone && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.form.tone}</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="input-field">
                <option value="energetic">{t.tones.energetic}</option>
                <option value="educational">{t.tones.educational}</option>
                <option value="funny">{t.tones.funny}</option>
                <option value="inspirational">{t.tones.inspirational}</option>
                <option value="professional">{t.tones.professional}</option>
                <option value="casual">{t.tones.casual}</option>
              </select>
            </div>
          )}

          <Button onClick={handleGenerate} loading={loading} className="w-full" size="lg">
            {!loading && <Sparkles className="h-4 w-4" />}
            {loading ? t.form.generating : t.form.generate}
          </Button>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-ocean-500/20 bg-ocean-500/5 p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
          <p className="text-xs leading-relaxed text-slate-400">{t.form.demoNotice}</p>
        </div>
      </div>

      {/* Results panel */}
      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">{resultTitle}</h2>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass h-32 rounded-2xl animate-pulse">
                <div className="shimmer-bg h-full rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        {!loading && !result && (
          <div className="glass flex flex-col items-center justify-center rounded-2xl py-20 text-center">
            <div className="mb-4 rounded-full bg-brand-500/10 p-4">
              <Sparkles className="h-6 w-6 text-brand-400" />
            </div>
            <p className="text-slate-400">{t.form.noResults}</p>
          </div>
        )}

        {!loading && result && (
          <div className="space-y-4 animate-fade-up">
            {children({ data: result, save, isSaved })}
          </div>
        )}
      </div>
    </div>
  );
}

function serializeTitle(data: unknown, tool: string, lang: 'en' | 'ar'): string {
  try {
    if (tool === 'ideas') {
      const ideas = data as { title: string }[];
      return ideas[0]?.title ?? (lang === 'ar' ? 'أفكار المحتوى' : 'Content Ideas');
    }
    if (tool === 'scripts') {
      const s = data as { title: string };
      return s.title ?? (lang === 'ar' ? 'سكربت فيديو' : 'Video Script');
    }
    if (tool === 'captions') {
      const c = data as { caption: string }[];
      return (c[0]?.caption ?? '').slice(0, 40) || (lang === 'ar' ? 'كابشن' : 'Captions');
    }
    if (tool === 'hashtags') {
      const h = data as { hashtags: string[] };
      return h.hashtags?.slice(0, 3).join(' ') ?? '#hashtags';
    }
    if (tool === 'planner') {
      return lang === 'ar' ? 'خطة المحتوى الأسبوعية' : 'Weekly Content Plan';
    }
  } catch {
    // fall through
  }
  return tool;
}
