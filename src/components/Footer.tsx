import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-400">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.product}</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="/#features" className="text-sm text-slate-400 hover:text-white">{t.nav.features}</a></li>
              <li><Link to="/pricing" className="text-sm text-slate-400 hover:text-white">{t.nav.pricing}</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-400 hover:text-white">{t.nav.dashboard}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.company}</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white">{t.footer.about}</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white">{t.footer.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{t.footer.legal}</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white">{t.footer.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Virello. {t.footer.rights}</p>
          <p className="text-xs text-slate-500">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
