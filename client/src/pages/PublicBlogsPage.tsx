
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PublicBlogsPage() {
  // Placeholder data
  const sampleBlogs = [
    {
      id: 1,
      title: 'The Future of AI in Content Creation',
      excerpt: 'An exploration of how AI is changing the landscape of digital marketing and content strategy. From automated writing to...',
    },
    {
      id: 2,
      title: 'Top 10 YouTube Channels for Developers',
      excerpt: 'A curated list of the best YouTube channels to follow if you are a software developer looking to stay updated with the latest trends.',
    },
    {
      id: 3,
      title: 'A Deep Dive into React Server Components',
      excerpt: 'Understand the what, why, and how of React Server Components and how they can improve your application\'s performance.',
    },
  ];

  return (
    <main className="flex-grow flex flex-col items-center p-4">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800 dark:text-white">
          Public Blogs
        </h2>
        <div className="grid gap-6 text-left">
          {sampleBlogs.map((blog) => (
            <Card key={blog.id} className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {blog.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
