
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { ApiKeyDialog } from './ApiKeyDialog';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isApiDialogOpen, setIsApiDialogOpen] = React.useState(false);

  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          AI Blogify
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/public-blogs">
            <Button variant="link" className="text-gray-600 dark:text-gray-300">
              Public Blogs
            </Button>
          </Link>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsApiDialogOpen(true)}>
            <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <span className="sr-only">API Key Settings</span>
          </Button>
        </div>
      </header>

      {/* Footer/Navigation Links */}
      <footer className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/about" className="hover:text-blue-500 transition-colors">
            About
          </Link>
          <Link to="/terms" className="hover:text-blue-500 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-blue-500 transition-colors">
            Privacy Policy
          </Link>
          <span>© 2025 AI Blogify</span>
        </div>
      </footer>

      <ApiKeyDialog open={isApiDialogOpen} onOpenChange={setIsApiDialogOpen} />
    </>
  );
}
