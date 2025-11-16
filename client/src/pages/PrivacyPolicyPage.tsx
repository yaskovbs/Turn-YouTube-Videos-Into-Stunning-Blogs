import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PrivacyPolicyPage() {
  return (
    <main className="flex-grow flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Last updated: November 16, 2025
            </p>

            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how AI Blogify ("we", "us", or "our") collects, uses, and protects
              your information when you use our web application.
            </p>

            <h2>2. Information We Collect</h2>

            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Gemini AI API Key</strong>: You voluntarily provide your Google Gemini AI API key</li>
              <li><strong>YouTube URLs</strong>: URLs you enter for blog generation</li>
              <li><strong>Generated Content</strong>: Blog posts you choose to publish publicly</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>YouTube Transcripts</strong>: Publicly available video transcripts fetched via YouTube's API</li>
              <li><strong>Technical Data</strong>: Standard web logs (IP address, browser type, timestamps)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To generate blog content from YouTube transcripts using Gemini AI</li>
              <li>To display published blogs on the public blogs page</li>
              <li>To provide and maintain the application functionality</li>
              <li>To improve user experience and application performance</li>
            </ul>

            <h2>4. Data Storage and Security</h2>

            <h3>API Key Storage</h3>
            <p>
              Your Gemini AI API key is stored <strong>locally in your browser's localStorage</strong> only.
              We never store, transmit, or access your API key on our servers. The key is only sent
              directly from your browser to Google's Gemini AI API servers for content generation.
            </p>

            <h3>Published Content Storage</h3>
            <p>
              When you publish a blog post, it is stored in our SQLite database along with:
            </p>
            <ul>
              <li>Title and content of the blog post</li>
              <li>Timestamp of publication</li>
              <li>No personal information is collected or stored</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We implement appropriate security measures to protect stored data, but no method of
              transmission over the internet is 100% secure.
            </p>

            <h2>5. Third-Party Services</h2>

            <h3>Google Gemini AI</h3>
            <p>
              Content generation is handled by Google's Gemini AI service. Your API key and the
              content you generate are subject to Google's Privacy Policy and Terms of Service.
              We do not have access to your API usage or generated content stored by Google.
            </p>

            <h3>YouTube</h3>
            <p>
              We fetch publicly available transcripts from YouTube. This data is processed temporarily
              in your browser and sent to Gemini AI for transformation. We do not store YouTube data.
            </p>

            <h2>6. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your information to third parties except:</p>
            <ul>
              <li>As required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>

            <h2>7. Your Rights</h2>
            <ul>
              <li><strong>Access</strong>: You can view all published blogs on the public blogs page</li>
              <li><strong>Control</strong>: You control what content you publish</li>
              <li><strong>Deletion</strong>: Contact us to request removal of published content</li>
              <li><strong>Local Data</strong>: You can clear your API key and local data anytime via browser settings</li>
            </ul>

            <h2>8. Cookies and Tracking</h2>
            <p>
              Currently, we do not use cookies or tracking technologies. The application relies on
              localStorage for API key persistence, which is managed by your browser.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              This service is not intended for children under 13. We do not knowingly collect
              personal information from children under 13.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any
              material changes by updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact
              us through the application or relevant support channels.
            </p>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Data Control</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your privacy is important. Your Gemini AI API key never leaves your browser except
                for direct communication with Google's servers. You have full control over what
                content you publish and can remove it at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
