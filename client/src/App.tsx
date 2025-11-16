
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { PublicBlogsPage } from '@/pages/PublicBlogsPage';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/30">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/public-blogs" element={<PublicBlogsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
