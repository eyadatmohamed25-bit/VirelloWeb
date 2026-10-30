import { useEffect, useState } from 'react';
import { Bookmark, Search, Trash2, Copy } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useLanguage } from '@/i18n/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { supabase, type SavedContent } from '@/lib/supabase';
import { CopyButton } from '@/components/CopyButton';
import { Loader } from '@/components/Loader';

export function SavedPage() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [items, setItems] = useState<SavedContent[] | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    supabase
      .from('saved_content')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setItems((data as SavedContent[]) ?? []));
  }, []);

  const tools = [
    { key: 'all', label: t.saved.filterAll },
    { key: 'ideas', label: t.tools.ideasShort },
    { key: 'scripts', label: t.tools.scriptsShort },
    { key: 'captions', label: t.tools.captionsShort },
    { key: 'hashtags', label: t.tools.hashtagsShort },
    { key: 'planner', label: t.tools.plannerShort },
  ];

  const toolLabel = (tool: string) =>
    tools.find((tt) => tt.key === tool)?.label ?? tool;

  const filtered = (items ?? []).filter((item) => {
    if (filter !== 'all' && item.tool !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return item.title.toLowerCase().includes(q) || JSON.stringify(item.content).toLowerCase().includes(q);
    }
    return true;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.saved.confirmDelete)) return;
    const { error } = await supabase.from('saved_content').delete().eq('id', id);
    if (error) {
      toast(t.toasts.error, 'error');
      return;
    }
    setItems((prev) => (prev ?? []).filter((i) => i.id !== id));
    toast(t.toasts.deleted);
  };

  const extractText = (item: SavedContent): string => {
    const c = item.content;
    if (item.tool === 'ideas') {
      const idea = c.idea as { title: string; hook: string; description: string };
      return `${idea.title}\n\n${idea.description}\n\nHook: ${idea.hook}`;
    }
    if (item.tool === 'scripts') {
      const s = c as { title: string; hook: string; body: string; cta: string; scenes: string[] };
      return `${s.title}\n\nHook: ${s.hook}\n\n${s.body}\n\nScenes:\n${s.scenes.map((sc, i) => `${i + 1}. ${sc}`).join('\n')}\n\nCTA: ${s.cta}`;
    }
    if (item.tool === 'captions') {
      return (c.caption as string) ?? JSON.stringify(c);
    }
    if (item.tool === 'hashtags') {
      const h = c.hashtags as string[];
      return h.join(' ');
    }
    if (item.tool === 'planner') {
      const days = c.days as { day: string; topic: string; format: string; postTime: string; tip: string }[];
      return days.map((d) => `${d.day}: ${d.topic} (${d.format}) — ${d.postTime}`).join('\n');
    }
    return JSON.stringify(c, null, 2);
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-brand-500/10 p-3 ring-1 ring-brand-500/20">
            <Bookmark className="h-6 w-6 text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display sm:text-2xl">{t.saved.title}</h1>
            <p className="text-sm text-slate-400">{t.saved.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Search + filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.saved.search}
            className="input-field pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tt) => (
            <button
              key={tt.key}
              onClick={() => setFilter(tt.key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === tt.key
                  ? 'border-brand-500/30 bg-brand-500/15 text-white'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {tt.label}
            </button>
          ))}
        </div>
      </div>

      {items === null ? (
        <Loader />
      ) : items.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center rounded-2xl py-20 text-center">
          <div className="mb-4 rounded-full bg-brand-500/10 p-4">
            <Bookmark className="h-6 w-6 text-brand-400" />
          </div>
          <p className="font-medium text-slate-300">{t.saved.empty}</p>
          <p className="mt-1 text-sm text-slate-500">{t.saved.emptyDesc}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl py-12 text-center text-sm text-slate-400">{t.saved.noResults}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="glass card-hover rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="chip border-brand-500/20 bg-brand-500/10 text-brand-300">
                      {toolLabel(item.tool)}
                    </span>
                    {item.platform && item.platform !== 'all' && (
                      <span className="chip">{item.platform}</span>
                    )}
                    <span className="text-xs text-slate-500">{fmtDate(item.created_at)}</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                    {extractText(item).slice(0, 160)}…
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CopyButton text={extractText(item)} />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {t.saved.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
