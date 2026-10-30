import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/Button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export function PricingPage() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const isAr = lang === 'ar';

  const plans = [
    {
      name: t.pricing.free,
      price: t.pricing.freePrice,
      desc: t.pricing.freeDesc,
      features: t.pricing.freeFeatures,
      icon: Zap,
      iconColor: 'text-ocean-400',
      gradient: 'from-ocean-500/10 to-transparent',
      border: 'border-white/10',
      cta: t.pricing.ctaFree,
      to: user ? '/dashboard' : '/signup',
    },
    {
      name: t.pricing.pro,
      price: t.pricing.proPrice,
      desc: t.pricing.proDesc,
      features: t.pricing.proFeatures,
      icon: Crown,
      iconColor: 'text-brand-400',
      gradient: 'from-brand-500/15 to-transparent',
      border: 'border-brand-500/30',
      cta: t.pricing.ctaPro,
      to: user ? '/dashboard' : '/signup',
      popular: true,
    },
  ];

  const faqs = isAr
    ? [
        { q: 'هل أحتاج بطاقة ائتمان للتسجيل؟', a: 'لا. يمكنك إنشاء حساب مجاني والبدء فوراً دون أي معلومات دفع.' },
        { q: 'متى سيتوفر الدفع؟', a: 'نحن نعمل على تفعيل نظام الدفع. حالياً جميع المميزات متاحة مجاناً.' },
        { q: 'هل يمكنني تغيير خطتي لاحقاً؟', a: 'نعم، يمكنك الترقية أو التبديل في أي وقت بمجرد تفعيل الدفع.' },
        { q: 'هل تدعمون اللغة العربية؟', a: 'نعم، المنصة متاحة بالكامل بالعربية والإنجليزية مع دعم كامل للكتابة من اليمين لليسار.' },
      ]
    : [
        { q: 'Do I need a credit card to sign up?', a: 'No. You can create a free account and start immediately with no payment info required.' },
        { q: 'When will payments be available?', a: "We're working on activating payments. For now all features are available for free." },
        { q: 'Can I change my plan later?', a: 'Yes, you can upgrade or switch anytime once payments are activated.' },
        { q: 'Do you support Arabic?', a: 'Yes, the entire platform is available in Arabic and English with full RTL support.' },
      ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex">
            <span className="chip border-brand-500/30 bg-brand-500/10 text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t.nav.pricing}
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl font-display">{t.pricing.title}</h1>
          <p className="mt-4 text-lg text-slate-400">{t.pricing.subtitle}</p>
        </div>

        {/* Plans */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass relative rounded-3xl border ${plan.border} bg-gradient-to-br ${plan.gradient} p-8 ${
                plan.popular ? 'animate-pulse-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    {t.pricing.mostPopular}
                  </span>
                </div>
              )}
              <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{plan.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white font-display">{plan.price}</span>
                <span className="text-sm text-slate-400">{t.pricing.perMonth}</span>
              </div>
              <Link to={plan.to}>
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20">
                      <Check className="h-3 w-3 text-brand-400" />
                    </div>
                    <span className="text-sm text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm text-slate-500">{t.pricing.note}</p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white font-display sm:text-3xl">{t.pricing.faqTitle}</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
