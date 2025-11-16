
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { YoutubeTranscript } from 'youtube-transcript';
import { db } from '../db/database.js';

const router = express.Router();

// User Management
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

router.post('/users', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }
  try {
    const newUser = await db
      .insertInto('users')
      .values({ username, gemini_api_key: null })
      .returningAll()
      .executeTakeFirstOrThrow();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

router.put('/users/:id/api-key', async (req, res) => {
    const { id } = req.params;
    const { apiKey } = req.body;
    if (!apiKey) {
        return res.status(400).json({ error: 'API Key is required.' });
    }
    try {
        await db
            .updateTable('users')
            .set({ gemini_api_key: apiKey })
            .where('id', '=', parseInt(id, 10))
            .execute();
        res.json({ message: 'API Key updated successfully.' });
    } catch (error) {
        console.error('Error updating API key:', error);
        res.status(500).json({ error: 'Failed to update API key.' });
    }
});

// Generate blog post from YouTube URL
router.post('/generate', async (req, res) => {
  const { youtubeUrl, userId } = req.body;
  if (!youtubeUrl || !userId) {
    return res.status(400).json({ error: 'YouTube URL and User ID are required.' });
  }
  try {
    const user = await db.selectFrom('users').selectAll().where('id', '=', userId).executeTakeFirst();
    if (!user || !user.gemini_api_key) {
        return res.status(400).json({ error: 'User not found or Gemini API key is not set.' });
    }

    let transcript;
    try {
        transcript = await YoutubeTranscript.fetchTranscript(youtubeUrl);
        // Log the fetched transcript for debugging
        console.log('Fetched transcript:', JSON.stringify(transcript, null, 2));
    } catch (transcriptError) {
        console.error('Error fetching transcript from youtube-transcript:', transcriptError);
        // Send a more specific error message to the client
        return res.status(500).json({ error: 'Failed to fetch transcript from YouTube.', details: transcriptError.message });
    }

    if (!transcript || transcript.length === 0) {
        console.log('Transcript is empty or null after fetching.');
        return res.status(404).json({ error: 'Could not get transcript for this video. It might be disabled or not available.' });
    }

    const transcriptText = transcript.map((item) => item.text).join(' ');
    if (!transcriptText.trim()) {
      console.log('Transcript text is empty after processing.');
      return res.status(404).json({ error: 'Could not get transcript for this video. The transcript content is empty.' });
    }

    const genAI = new GoogleGenerativeAI(user.gemini_api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Based on the following transcript, write a blog post. Return a JSON object with "title" and "content" keys. The content should be markdown. Transcript: "${transcriptText}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const generatedPost = JSON.parse(cleanedText);

    const newBlog = await db
      .insertInto('blogs')
      .values({ 
        user_id: userId,
        title: generatedPost.title, 
        content: generatedPost.content,
        youtube_url: youtubeUrl,
        is_public: false
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error in /generate endpoint:', error);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
});

// Get all public blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await db.selectFrom('blogs').where('is_public', '=', true).selectAll().orderBy('created_at', 'desc').execute();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// Get all blogs for a specific user
router.get('/users/:id/blogs', async (req, res) => {
    const { id } = req.params;
    try {
        const blogs = await db.selectFrom('blogs').where('user_id', '=', parseInt(id, 10)).selectAll().orderBy('created_at', 'desc').execute();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        res.status(500).json({ error: 'Failed to fetch user blogs.' });
    }
});

// Publish a new blog
router.post('/blogs', async (req, res) => {
  const { title, content, userId, isPublic } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ error: 'Title, content and User ID are required.' });
  }
  try {
    const newBlog = await db
      .insertInto('blogs')
      .values({ 
        title, 
        content,
        user_id: userId,
        is_public: isPublic || false
      })
      .returningAll()
      .executeTakeFirstOrThrow();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error publishing blog:', error);
    res.status(500).json({ error: 'Failed to publish blog.' });
  }
});

// Custom Domains
router.post('/users/:id/domains', async (req, res) => {
    const { id } = req.params;
    const { domain } = req.body;
    if (!domain) {
        return res.status(400).json({ error: 'Domain is required.' });
    }
    try {
        const newDomain = await db
            .insertInto('custom_domains')
            .values({ user_id: parseInt(id, 10), domain })
            .returningAll()
            .executeTakeFirstOrThrow();
        res.status(201).json(newDomain);
    } catch (error) {
        console.error('Error adding custom domain:', error);
        res.status(500).json({ error: 'Failed to add custom domain.' });
    }
});

export default router;
