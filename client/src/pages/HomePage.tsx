
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Youtube, Loader2, AlertCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { API_BASE_URL } from '@/config';

interface GeneratedPost {
  title: string;
  content: string;
}

export function HomePage({ user }) {
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const [embedVideo, setEmbedVideo] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [generatedPost, setGeneratedPost] = React.useState<GeneratedPost | null>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const handleGenerate = async () => {
    if (!user) {
      setError('Please log in to generate a blog post.');
      return;
    }
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      setError('Please set your Gemini AI API key in the settings.');
      return;
    }
    if (!youtubeUrl) {
      setError('Please enter a YouTube URL.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPost(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl, userId: user.id, embedVideo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred.');
      }

      const data: GeneratedPost = await response.json();
      setGeneratedPost(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedPost || !user) return;

    setIsPublishing(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...generatedPost, userId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to publish.');
      }
      
      alert('Blog post published successfully!');
      setGeneratedPost(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
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
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-32 py-6 text-base rounded-full shadow-lg focus:ring-blue-400 focus:ring-2 transition-shadow"
            disabled={isLoading || !user}
          />
          <Button 
            type="submit" 
            onClick={handleGenerate}
            disabled={isLoading || !user}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Generate'}
          </Button>
        </div>
        {!user && <p className="text-red-500 mt-2">Please log in to use the generator.</p>}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <Checkbox id="embed-video" checked={embedVideo} onCheckedChange={(checked) => setEmbedVideo(Boolean(checked))} />
          <Label htmlFor="embed-video" className="text-gray-600 dark:text-gray-300">Embed YouTube Video</Label>
        </div>
      </div>

      {error && (
        <div className="w-full max-w-3xl mt-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="w-full max-w-3xl mt-12 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          <p className="text-gray-500 dark:text-gray-400">Generating your blog post... This might take a moment.</p>
        </div>
      )}

      {generatedPost && (
        <div className="w-full max-w-3xl mt-12">
          <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl text-left animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{generatedPost.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: generatedPost.content.replace(/\n/g, '<br />') }}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !user}
                className="ml-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                {isPublishing ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                Publish
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </main>
  );
}
