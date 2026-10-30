import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Video,
  MessageSquare,
  Hash,
  CalendarDays,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase, type SavedContent } from '@/lib/supabase';

export function DashboardHome() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [savedCount, setSavedCount] = useState(0);
  const [recent, setRecent] = useState<SavedContent[]>([]);

  useEffect(() => {
    supabase
      .from('saved_content')
      .select('id, tool, title, created_at', { count: 'exact', head: false })
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data, count }) => {
        setSavedCount(count ?? 0);
        setRecent((data as SavedContent[]) ?? []);
      });
  }, []);

  const isAr = lang === 'ar';

  const tools = [
    { to: '/dashboard/ideas', icon: Lightbulb, label: t.tools.ideas, desc: t.features.ideasDesc, color: 'from-brand-500/15 to-transparent', iconColor: 'text-brand-400' },
    { to: '/dashboard/scripts', icon: Video, label: t.tools.scripts, desc: t.features.scriptsDesc, color: 'from-ocean-500/15 to-transparent', iconColor: 'text-ocean-400' },
    { to: '/dashboard/captions', icon: MessageSquare, label: t.tools.captions, desc: t.features.captionsDesc, color: 'from-accent-500/15 to-transparent', iconColor: 'text-accent-400' },
    { to: '/dashboard/hashtags', icon: Hash, label: t.tools.hashtags, desc: t.features.hashtagsDesc, color: 'from-brand-500/15 to-transparent', iconColor: 'text-brand-300' },
    { to: '/dashboard/planner', icon: CalendarDays, label: t.tools.planner, desc: t.features.plannerDesc, color: 'from-ocean-500/15 to-transparent', iconColor: 'text-ocean-400' },
  ];

  const stats = [
    { icon: Sparkles, label: t.dashboard.stats.tools, value: '5', color: 'text-brand-400' },
    { icon: Bookmark, label: t.dashboard.stats.saved, value: String(savedCount), color: 'text-ocean-400' },
    { icon: TrendingUp, label: t.dashboard.stats.created, value: savedCount > 0 ? String(savedCount) : '—', color: 'text-accent-400' },
    { icon: Clock, label: t.dashboard.stats.streak, value: '1', color: 'text-brand-300' },
  ];

  const toolLabel = (tool: string) =>
    ({
      ideas: t.tools.ideasShort,
      scripts: t.tools.scriptsShort,
      captions: t.tools.captionsShort,
      hashtags: t.tools.hashtagsShort,
      planner: t.tools.plannerShort,
    }[tool] ?? tool);

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-white font-display sm:text-3xl">
            {t.dashboard.welcome}{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <p className="mt-1 text-slate-400">{t.dashboard.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-white font-display">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tools grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display">{t.dashboard.tools}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <Link
                key={tool.to}
                to={tool.to}
                className={`glass card-hover group rounded-2xl p-6 bg-gradient-to-br ${tool.color} animate-fade-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                </div>
                <h3 className="font-bold text-white">{tool.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400 line-clamp-2">{tool.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-400 transition-transform group-hover:gap-2">
                  {t.dashboard.getStarted}
                  <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            ))}

            {/* Saved content card */}
            <Link
              to="/dashboard/saved"
              className="glass card-hover group rounded-2xl p-6 bg-gradient-to-br from-brand-500/10 to-transparent animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                <Bookmark className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="font-bold text-white">{t.saved.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400 line-clamp-2">{t.saved.subtitle}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-400 transition-transform group-hover:gap-2">
                {t.dashboard.viewAll}
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display">{t.dashboard.recentActivity}</h2>
            {recent.length > 0 && (
              <Link to="/dashboard/saved" className="text-sm text-brand-400 hover:text-brand-300">
                {t.dashboard.viewAll}
              </Link>
            )}
          </div>
          {recent.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-sm font-medium text-slate-300">{t.dashboard.noActivity}</p>
              <p className="mt-1 text-sm text-slate-500">{t.dashboard.noActivityDesc}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((item) => (
                <div key={item.id} className="glass flex items-center justify-between rounded-xl p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">
                      <Bookmark className="h-4 w-4 text-brand-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-slate-500">{toolLabel(item.tool)} · {fmtDate(item.created_at)}</p>
                    </div>
                  </div>
                  <Link to="/dashboard/saved" className="text-xs text-brand-400 hover:text-brand-300 shrink-0">
                    {t.dashboard.openTool}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
