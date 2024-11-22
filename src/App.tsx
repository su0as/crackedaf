import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export function App() {
  const [siliconValleyOnly, setSiliconValleyOnly] = useState(false);

  return (
    <AdminProvider>
      <StoryProvider>
        <Router>
          <div className="min-h-screen bg-black pb-40">
            <Header 
              siliconValleyOnly={siliconValleyOnly} 
              setSiliconValleyOnly={setSiliconValleyOnly} 
            />
            <Routes>
              <Route path="/" element={<TopStories siliconValleyOnly={siliconValleyOnly} />} />
              <Route path="/new" element={<TopStories siliconValleyOnly={siliconValleyOnly} />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/item/:id" element={<StoryDetails />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <ImageCarousel />
          </div>
        </Router>
      </StoryProvider>
    </AdminProvider>
  );
}