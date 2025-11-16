
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const Header = ({ user }) => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Blog Generator</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <div className="flex items-center space-x-2">
            <img src={user.photos[0].value} alt={user.displayName} className="w-8 h-8 rounded-full" />
            <span className="text-gray-800 dark:text-gray-100">{user.displayName}</span>
          </div>
        ) : (
          <Button onClick={handleLogin}>Login with Google</Button>
        )}
      </div>
    </header>
  );
};
