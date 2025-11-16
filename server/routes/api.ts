
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { YoutubeTranscript } from 'youtube-transcript';
import { db } from '../db/database.js';

const router = express.Router();

// Generate blog post from YouTube URL
router.post('/generate', async (req, res) => {
  const { youtubeUrl, apiKey } = req.body;

  if (!youtubeUrl || !apiKey) {
    res.status(400).json({ error: 'YouTube URL and API Key are required.' });
    return;
  }

  try {
    // 1. Get transcript from YouTube
    const transcript = await YoutubeTranscript.fetchTranscript(youtubeUrl);
    const transcriptText = transcript.map((item) => item.text).join(' ');

    if (!transcriptText) {
      res.status(404).json({ error: 'Could not get transcript for this video. It might be disabled.' });
      return;
    }

    // 2. Use Gemini AI to generate blog post
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Based on the following transcript from a YouTube video, write a high-quality, engaging blog post. The blog post should have a catchy title and be well-structured. Return the response as a JSON object with two keys: "title" and "content". The content should be formatted in markdown. Transcript: "${transcriptText}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Clean the response to be valid JSON
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse the JSON string
    const generatedPost = JSON.parse(cleanedText);

    res.json(generatedPost);
  } catch (error) {
    console.error('Error generating blog post:', error);
    res.status(500).json({ error: 'Failed to generate blog post. Please check the YouTube URL and your API key.' });
  }
});

// Get all public blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await db.selectFrom('blogs').selectAll().orderBy('created_at', 'desc').execute();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// Publish a new blog
router.post('/blogs', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required.' });
    return;
  }

  try {
    const newBlog = await db
      .insertInto('blogs')
      .values({ title, content })
      .returningAll()
      .executeTakeFirstOrThrow();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error publishing blog:', error);
    res.status(500).json({ error: 'Failed to publish blog.' });
  }
});

export default router;
