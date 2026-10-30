import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/[0.06]">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="/#features" className="nav-link">{t.nav.features}</a>
            <a href="/#how" className="nav-link">{t.nav.howItWorks}</a>
            <Link to="/pricing" className="nav-link">{t.nav.pricing}</Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm">
                    <LayoutDashboard className="h-4 w-4" />
                    {t.nav.dashboard}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t.nav.login}</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">{t.nav.signup}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass border-b border-white/[0.06] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            <a href="/#features" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/5">{t.nav.features}</a>
            <a href="/#how" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/5">{t.nav.howItWorks}</a>
            <Link to="/pricing" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/5">{t.nav.pricing}</Link>
            <div className="my-2 h-px bg-white/10" />
            <div className="flex items-center justify-between px-3">
              <LanguageSwitcher />
            </div>
            {user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">{t.nav.dashboard}</Button>
                </Link>
                <Button variant="ghost" size="md" onClick={() => { setOpen(false); handleLogout(); }}>{t.nav.logout}</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">{t.nav.login}</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button size="md" className="w-full">{t.nav.signup}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
