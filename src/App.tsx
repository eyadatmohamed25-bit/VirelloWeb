import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { PricingPage } from '@/pages/PricingPage';
import { AuthPage } from '@/pages/AuthPage';
import { DashboardHome } from '@/pages/DashboardHome';
import { IdeasPage } from '@/pages/IdeasPage';
import { ScriptsPage } from '@/pages/ScriptsPage';
import { CaptionsPage } from '@/pages/CaptionsPage';
import { HashtagsPage } from '@/pages/HashtagsPage';
import { PlannerPage } from '@/pages/PlannerPage';
import { SavedPage } from '@/pages/SavedPage';

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicShell><LandingPage /></PublicShell>} />
              <Route path="/pricing" element={<PublicShell><PricingPage /></PublicShell>} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/dashboard/ideas" element={<IdeasPage />} />
                <Route path="/dashboard/scripts" element={<ScriptsPage />} />
                <Route path="/dashboard/captions" element={<CaptionsPage />} />
                <Route path="/dashboard/hashtags" element={<HashtagsPage />} />
                <Route path="/dashboard/planner" element={<PlannerPage />} />
                <Route path="/dashboard/saved" element={<SavedPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
