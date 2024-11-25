import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminProvider } from './context/AdminContext';
import { StoryProvider } from './context/StoryContext';
import { Header } from './components/Header';
import { TopStories } from './pages/TopStories';
import { Submit } from './pages/Submit';
import { StoryDetails } from './pages/StoryDetails';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ImageCarousel } from './components/ImageCarousel';
import { TestFirebase } from './components/TestFirebase';

export function App() {
  const [siliconValleyOnly, setSiliconValleyOnly] = useState(false);

  return (
    <AdminProvider>
      <StoryProvider>
        <Router>
          <div className="min-h-screen bg-black">
            <Header 
              siliconValleyOnly={siliconValleyOnly} 
              setSiliconValleyOnly={setSiliconValleyOnly} 
            />
            <div className="pt-16 pb-40">
              <Routes>
                <Route path="/" element={<Navigate to="/new" replace />} />
                <Route path="/top" element={<TopStories siliconValleyOnly={siliconValleyOnly} view="top" />} />
                <Route path="/new" element={<TopStories siliconValleyOnly={siliconValleyOnly} view="new" />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/item/:id" element={<StoryDetails />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/test" element={<TestFirebase />} />
              </Routes>
            </div>
            <ImageCarousel />
          </div>
        </Router>
      </StoryProvider>
    </AdminProvider>
  );
}