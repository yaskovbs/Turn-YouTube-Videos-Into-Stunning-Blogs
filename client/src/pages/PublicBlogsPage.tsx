
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  youtube_url: string | null;
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    }
    return null;
};


export function PublicBlogsPage() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs.');
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center p-4">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800 dark:text-white">
          Public Blogs
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <div className="grid gap-6 text-left">
            {blogs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No public blogs yet. Be the first to publish!</p>
            ) : (
              blogs.map((blog) => {
                const videoId = blog.youtube_url ? getYouTubeVideoId(blog.youtube_url) : null;
                return (
                  <Card key={blog.id} className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{blog.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {videoId && (
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                          ></iframe>
                        </div>
                      )}
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
                      />
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        )}
      </div>
    </main>
  );
}
