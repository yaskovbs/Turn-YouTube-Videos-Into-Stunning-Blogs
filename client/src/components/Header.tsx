
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { ApiKeyDialog } from './ApiKeyDialog';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isApiDialogOpen, setIsApiDialogOpen] = React.useState(false);

  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Blogify
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsApiDialogOpen(true)}>
            <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <span className="sr-only">API Key Settings</span>
          </Button>
        </div>
      </header>
      <ApiKeyDialog open={isApiDialogOpen} onOpenChange={setIsApiDialogOpen} />
    </>
  );
}
