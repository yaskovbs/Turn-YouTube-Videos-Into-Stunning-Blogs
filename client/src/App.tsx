
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { PublicBlogsPage } from '@/pages/PublicBlogsPage';
import { TermsOfServicePage } from '@/pages/TermsOfServicePage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { AboutPage } from '@/pages/AboutPage';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user'); // Assuming you have an endpoint to get the current user
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/30">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/public-blogs" element={<PublicBlogsPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
