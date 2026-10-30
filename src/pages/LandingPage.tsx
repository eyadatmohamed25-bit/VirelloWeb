import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Video,
  MessageSquare,
  Hash,
  CalendarDays,
  Bookmark,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { CopyButton } from '@/components/CopyButton';

export function LandingPage() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const isAr = lang === 'ar';
  const features = [
    { icon: Lightbulb, title: t.features.ideasTitle, desc: t.features.ideasDesc, color: 'from-brand-500/20 to-brand-600/5', iconColor: 'text-brand-400' },
    { icon: Video, title: t.features.scriptsTitle, desc: t.features.scriptsDesc, color: 'from-ocean-500/20 to-ocean-600/5', iconColor: 'text-ocean-400' },
    { icon: MessageSquare, title: t.features.captionsTitle, desc: t.features.captionsDesc, color: 'from-accent-500/20 to-accent-600/5', iconColor: 'text-accent-400' },
    { icon: Hash, title: t.features.hashtagsTitle, desc: t.features.hashtagsDesc, color: 'from-brand-500/20 to-ocean-600/5', iconColor: 'text-brand-300' },
    { icon: CalendarDays, title: t.features.plannerTitle, desc: t.features.plannerDesc, color: 'from-ocean-500/20 to-brand-600/5', iconColor: 'text-ocean-400' },
    { icon: Bookmark, title: t.features.savedTitle, desc: t.features.savedDesc, color: 'from-brand-500/20 to-brand-600/5', iconColor: 'text-brand-400' },
  ];

  const steps = [
    { num: '01', title: t.landing.step1Title, desc: t.landing.step1Desc },
    { num: '02', title: t.landing.step2Title, desc: t.landing.step2Desc },
    { num: '03', title: t.landing.step3Title, desc: t.landing.step3Desc },
  ];

  const platformStats = [
    { name: 'TikTok', value: '2.1B+', label: isAr ? 'مستخدم' : 'users' },
    { name: 'Instagram', value: '2B+', label: isAr ? 'مستخدم' : 'users' },
    { name: 'YouTube', value: '2.7B+', label: isAr ? 'مستخدم' : 'users' },
  ];

  const previewIdeas = isAr
    ? [
        { title: '5 أخطاء في اللياقة يرتكبها الجميع', hook: 'تمرّن بشكل خاطئ؟ إليك 5 أخطاء تصلحها اليوم.' },
        { title: 'جرّبت اللياقة 30 يوماً — إليك ما حدث', hook: 'اليوم 1 مقابل اليوم 30 — النتائج صدمتني.' },
        { title: 'دليل اللياقة الشامل للمبتدئين', hook: 'إذا كنت جديداً، فهذا الدليل الوحيد الذي تحتاجه.' },
      ]
    : [
        { title: '5 fitness mistakes everyone makes', hook: "You're probably working out wrong — fix these today." },
        { title: 'I tried fitness for 30 days — here\'s what happened', hook: 'Day 1 vs Day 30 — the results shocked me.' },
        { title: 'The ultimate fitness starter guide', hook: 'If you\'re new to fitness, this is the only guide you need.' },
      ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex animate-fade-in">
              <span className="chip border-brand-500/30 bg-brand-500/10 text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
                {t.landing.badge}
              </span>
            </div>
            <h1 className="animate-fade-up text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
              {t.landing.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-slate-400 [animation-delay:100ms]">
              {t.landing.heroSubtitle}
            </p>
            <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:200ms] sm:flex-row">
              <Link to={user ? '/dashboard' : '/signup'}>
                <Button size="lg">
                  {t.landing.ctaPrimary}
                  <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" size="lg">{t.landing.ctaSecondary}</Button>
              </a>
            </div>

            <div className="mt-10 flex animate-fade-in flex-wrap items-center justify-center gap-x-8 gap-y-3 [animation-delay:400ms]">
              {platformStats.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-300">{p.name}</span>
                  <span className="text-slate-600">·</span>
                  <span>{p.value} {p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual / product preview */}
          <div className="mx-auto mt-16 max-w-5xl animate-scale-in [animation-delay:300ms]">
            <div className="glass-strong rounded-3xl p-2 shadow-2xl">
              <div className="rounded-2xl bg-ink-900 p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/60" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-500">virello.app/dashboard</span>
                </div>
                <div className="grid gap-4 pt-6 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 text-brand-400">
                      <Lightbulb className="h-5 w-5" />
                      <span className="text-sm font-semibold text-white">{t.tools.ideas}</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {previewIdeas.map((idea, i) => (
                        <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-sm font-medium text-white">{idea.title}</p>
                          <p className="mt-1 text-xs text-slate-400">{idea.hook}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-5">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-brand-400" />
                        <span className="text-sm font-semibold text-white">{t.dashboard.stats.created}</span>
                      </div>
                      <p className="mt-3 text-3xl font-bold gradient-text font-display">128</p>
                      <p className="mt-1 text-xs text-slate-500">{isAr ? 'هذا الأسبوع' : 'this week'}</p>
                    </div>
                    <div className="rounded-xl border border-ocean-500/20 bg-gradient-to-br from-ocean-500/10 to-transparent p-5">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-ocean-400" />
                        <span className="text-sm font-semibold text-white">{isAr ? 'سرعة الإنشاء' : 'Generation speed'}</span>
                      </div>
                      <p className="mt-3 text-3xl font-bold text-ocean-400 font-display">1.2s</p>
                      <p className="mt-1 text-xs text-slate-500">{isAr ? 'متوسط الوقت' : 'avg per result'}</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-accent-400" />
                        <span className="text-sm font-semibold text-white">{isAr ? 'اللغات المدعومة' : 'Languages'}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className="chip">English</span>
                        <span className="chip">العربية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl font-display">{t.landing.featuresTitle}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.landing.featuresSubtitle}</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`glass card-hover group rounded-2xl p-6 bg-gradient-to-br ${f.color} animate-fade-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <f.icon className={`h-6 w-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl font-display">{t.landing.howTitle}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.landing.howSubtitle}</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-ocean-500/10 ring-1 ring-white/10">
                  <span className="font-display text-2xl font-bold gradient-text">{s.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-6 hidden h-6 w-6 text-slate-700 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl font-display">{t.landing.previewTitle}</h2>
              <p className="mt-4 text-lg text-slate-400">{t.landing.previewSubtitle}</p>
              <ul className="mt-6 space-y-3">
                {previewIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-medium text-white">{idea.title}</p>
                      <p className="text-sm text-slate-400">{idea.hook}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link to={user ? '/dashboard/ideas' : '/signup'}>
                  <Button>
                    {isAr ? 'جرّب الآن' : 'Try it now'}
                    <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="glass-strong rounded-3xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Lightbulb className="h-5 w-5 text-brand-400" />
                  <span className="text-sm font-semibold text-white">{t.tools.ideas}</span>
                  <span className="ml-auto text-xs text-slate-500">{isAr ? 'اللياقة' : 'Fitness'}</span>
                </div>
                {previewIdeas.map((idea, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{idea.title}</p>
                      <CopyButton text={`${idea.title}\n\n${idea.hook}`} />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{idea.hook}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-glow-brand" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl font-display">{t.landing.ctaBottomTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">{t.landing.ctaBottomSubtitle}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to={user ? '/dashboard' : '/signup'}>
                  <Button size="lg">
                    {t.landing.ctaPrimary}
                    <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">{t.nav.pricing}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
