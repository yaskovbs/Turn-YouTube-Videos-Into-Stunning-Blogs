
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { YoutubeTranscript } from 'youtube-transcript';

const router = express.Router();

// User Management - simplified without database
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Generate blog post from YouTube URL
router.post('/generate', async (req, res) => {
  const { youtubeUrl, geminiApiKey } = req.body;
  if (!youtubeUrl) {
    return res.status(400).json({ error: 'YouTube URL is required.' });
  }

  const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: 'Gemini API key is required.' });
  }

  try {
    let transcript;
    try {
        transcript = await YoutubeTranscript.fetchTranscript(youtubeUrl);
        console.log('Fetched transcript successfully');
    } catch (transcriptError) {
        console.error('Error fetching transcript from youtube-transcript:', transcriptError);
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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Based on the following transcript, write a blog post. Return a JSON object with "title" and "content" keys. The content should be markdown. Transcript: "${transcriptText}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const generatedPost = JSON.parse(cleanedText);

    // Generate a simple ID for the blog post
    const blogId = Date.now().toString();

    const responseData = {
      id: blogId,
      title: generatedPost.title,
      content: generatedPost.content,
      youtube_url: youtubeUrl,
      created_at: new Date().toISOString(),
      is_public: false
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error in /generate endpoint:', error);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
});

// Mock endpoint for blogs - returns empty array
router.get('/blogs', (req, res) => {
  res.json([]);
});

export default router;
