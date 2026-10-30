import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const { t, lang } = useLanguage();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.auth.errorEmail);
      return;
    }
    if (password.length < 6) {
      setError(t.auth.errorPassword);
      return;
    }

    setLoading(true);
    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);
    setLoading(false);

    if (error) {
      setError(isLogin ? t.auth.loginError : t.auth.signupError);
      return;
    }

    if (isLogin) {
      navigate(from);
    } else {
      // signUp auto-logs in with Supabase session when email confirmation is off
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="relative flex items-center justify-center px-4 py-8 flex-1">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/"><Logo /></Link>
            <LanguageSwitcher />
          </div>

          <div className="glass-strong rounded-3xl p-8 animate-scale-in">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex rounded-2xl bg-brand-500/10 p-3 ring-1 ring-brand-500/20">
                <Sparkles className="h-6 w-6 text-brand-400" />
              </div>
              <h1 className="text-2xl font-bold text-white font-display">
                {isLogin ? t.auth.loginTitle : t.auth.signupTitle}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {isLogin ? t.auth.loginSubtitle : t.auth.signupSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.auth.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.auth.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  {error}
                </div>
              )}

              <Button type="submit" loading={loading} size="lg" className="w-full">
                {!loading && (isLogin ? t.auth.loginBtn : t.auth.signupBtn)}
                {!loading && <ArrowRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              {isLogin ? t.auth.noAccount : t.auth.haveAccount}{' '}
              <Link to={isLogin ? '/signup' : '/login'} className="font-semibold text-brand-400 hover:text-brand-300">
                {isLogin ? t.auth.signupLink : t.auth.loginLink}
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-slate-500">{t.auth.demoNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
