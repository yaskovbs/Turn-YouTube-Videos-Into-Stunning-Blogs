
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube } from 'lucide-react';

export function HomePage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
          Turn YouTube Videos into Stunning Blogs
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Paste a YouTube link, and our AI will craft a high-quality, engaging blog post for you in seconds.
        </p>

        <div className="relative max-w-lg mx-auto">
          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-32 py-6 text-base rounded-full shadow-lg focus:ring-blue-400 focus:ring-2 transition-shadow"
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Generate
          </Button>
        </div>
      </div>
    </main>
  );
}
