
import * as React from 'react';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/30">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
