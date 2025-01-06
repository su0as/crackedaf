import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminProvider } from './context/AdminContext';
import { StoryProvider } from './context/StoryContext';
import { AuthProvider } from './providers/AuthProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { WaitlistBanner } from './components/WaitlistBanner';
import { TopStories } from './pages/TopStories';
import { Submit } from './pages/Submit';
import { StoryDetails } from './pages/StoryDetails';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Breakout } from './pages/Breakout';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ImageCarousel } from './components/ImageCarousel';
import { TestFirebase } from './components/TestFirebase';
import { FeedbackButton } from './components/FeedbackButton';
import { RequireAuth } from './components/RequireAuth';
import { useLocation } from 'react-router-dom';

export function App() {
  const [siliconValleyOnly, setSiliconValleyOnly] = useState(false);
  const location = useLocation();
  const showCarousel = location.pathname !== '/breakout';
  const showFeedback = location.pathname !== '/admin' && 
                      location.pathname !== '/admin/login';
  const showWaitlist = location.pathname !== '/breakout';

  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <StoryProvider>
            <div className="min-h-screen bg-black">
              <Header 
                siliconValleyOnly={siliconValleyOnly} 
                setSiliconValleyOnly={setSiliconValleyOnly} 
              />
              {showWaitlist && <WaitlistBanner />}
              <div className="pt-2 pb-40">
                <Routes>
                  <Route path="/" element={<Navigate to="/new" replace />} />
                  <Route path="/top" element={<TopStories siliconValleyOnly={siliconValleyOnly} view="top" />} />
                  <Route path="/new" element={<TopStories siliconValleyOnly={siliconValleyOnly} view="new" />} />
                  <Route 
                    path="/submit" 
                    element={
                      <RequireAuth>
                        <Submit />
                      </RequireAuth>
                    } 
                  />
                  <Route path="/breakout" element={<Breakout />} />
                  <Route path="/item/:id" element={<StoryDetails />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin" 
                    element={
                      <RequireAuth>
                        <AdminDashboard />
                      </RequireAuth>
                    } 
                  />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/test" element={<TestFirebase />} />
                </Routes>
              </div>
              {showCarousel && <ImageCarousel />}
              {showFeedback && <FeedbackButton />}
            </div>
          </StoryProvider>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}