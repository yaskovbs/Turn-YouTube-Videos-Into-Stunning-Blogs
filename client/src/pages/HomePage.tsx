
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setShowResult(false); // Hide previous results
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <main className="flex-grow flex flex-col items-center p-4 text-center">
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
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            onClick={handleGenerate}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Generate'}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="w-full max-w-3xl mt-12 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          <p className="text-gray-500 dark:text-gray-400">Generating your blog post... This might take a moment.</p>
        </div>
      )}

      {showResult && (
        <div className="w-full max-w-3xl mt-12">
          <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl text-left animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Generated Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                The generated content will appear here. This is a placeholder to show where the blog post will be displayed once the AI finishes processing the video.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
