import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Sparkles, Globe, Shield, AlertTriangle } from 'lucide-react';

export function AboutPage() {
  return (
    <main className="flex-grow flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
            About AI Blogify
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Transform YouTube videos into engaging blog posts with the power of AI
          </p>
        </div>

        {/* What We Do */}
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Youtube className="h-8 w-8 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">YouTube Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Extract transcripts from YouTube videos to use as source material for your blog posts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Sparkles className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">AI-Powered Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use Google's Gemini AI to transform raw transcripts into well-structured, engaging blog content.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="h-8 w-8 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Public Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your AI-generated blogs with the community on our public blog platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
              <li><strong>Set up your API key:</strong> Enter your Google Gemini AI API key in the settings</li>
              <li><strong>Paste a YouTube URL:</strong> Copy any YouTube video link you want to transform</li>
              <li><strong>Generate content:</strong> Our AI extracts the transcript and creates a blog post</li>
              <li><strong>Review and edit:</strong> Check the generated content and make any adjustments</li>
              <li><strong>Publish:</strong> Share your blog post with the community</li>
            </ol>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">✨ AI-Powered Writing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced AI creates engaging, well-structured content from video transcripts
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">🔒 Privacy First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your API key stays in your browser; we never store or access it
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">🌐 Public Platform</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share your content with a global community of writers and creators
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">📱 Responsive Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Works seamlessly on desktop and mobile devices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notices */}
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              Important Legal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">AI-Generated Content</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    All content generated by this tool is created by AI. We recommend reviewing and fact-checking
                    all generated content before publishing. Clearly disclose AI-generated content when sharing.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Fair Use and Copyright</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This tool transforms existing content into new formats. Users are responsible for ensuring
                    their use complies with copyright laws and fair use guidelines. Only use content you're
                    authorized to work with.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <Globe className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Educational Purpose</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    This application is designed for educational and creative purposes, helping users learn
                    about content creation and AI tools while developing their writing skills.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Frontend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  React, TypeScript, Tailwind CSS, Vite
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Backend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Express.js, SQLite, Kysely ORM
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">AI & APIs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Google Gemini AI, YouTube Transcript API
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Version Info */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Version 1.0.0 - November 2025</p>
          <p className="mt-2">
            Questions? Check our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> or{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
}
