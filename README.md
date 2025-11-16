# Turn YouTube Videos Into Stunning Blogs

A modern web application that transforms YouTube video transcripts into engaging blog posts using Google's Gemini AI.

## Features

- 📺 Convert YouTube videos to blog posts automatically
- 🤖 Powered by Google Gemini AI for high-quality content generation
- 🌙 Dark/Light theme support
- 📱 Responsive design with modern UI
- 💾 Local file-based database for blog storage
- 🚀 Fast development with Vite and React

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Generative AI (Gemini)
- **Database**: File-based JSON storage with Kysely-compatible API
- **UI**: Radix UI components, Lucide icons

## Prerequisites

- Node.js 18+ (preferably 20.x for better compatibility)
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd turn-youtube-videos-into-stunning-blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your Google Gemini API key:
   ```
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run start
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Usage

### Creating Blog Posts from YouTube Videos

1. Open the application in your browser
2. Enter a YouTube video URL in the input field
3. Provide your Google Gemini API key (or set it in the environment variables)
4. Click "Generate Blog Post"
5. The AI will analyze the video transcript and create an engaging blog post
6. Review and publish the generated content

### API Endpoints

#### Generate Blog Post
```http
POST /api/generate
Content-Type: application/json

{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "apiKey": "your_gemini_api_key"
}
```

#### Get All Published Blogs
```http
GET /api/blogs
```

#### Publish a Blog Post
```http
POST /api/blogs
Content-Type: application/json

{
  "title": "Blog Title",
  "content": "Blog content in markdown format"
}
```

## Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities
├── server/                # Express backend
│   ├── db/               # Database layer
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
├── data/                 # Data storage (JSON files)
├── dist/                 # Built application
└── scripts/              # Development scripts
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Gemini API Configuration
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration (File-based)
DATA_DIR=./data
```

## Development

### Available Scripts

- `npm run start` - Start development server (both frontend and backend)
- `npm run build` - Build for production
- `npm run dev` - Start only the frontend development server

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Troubleshooting

### Common Issues

1. **"Could not get transcript for this video. It might be disabled."**
   - Some YouTube videos don't have transcripts available
   - Transcripts might be disabled by the video creator
   - Try videos with closed captions enabled

2. **Google Gemini API errors**
   - Check that your API key is valid and has quota remaining
   - Ensure the API key has the correct permissions
   - Verify your billing is set up if required

3. **Port already in use**
   - The default ports (3001 for backend, 5173 for frontend) might be occupied
   - Check and kill processes using these ports, or modify the configuration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal Information

### Copyright Notice

Copyright (c) 2025 Turn YouTube Videos Into Stunning Blogs

### Usage Rights

This application is designed for personal and educational use. When using this application:

- Respect YouTube's Terms of Service
- Respect Google Gemini AI's Terms of Service
- Respect copyright laws when creating and sharing content
- Obtain proper permissions for any commercial use

### Privacy

- API keys are processed server-side and not stored
- Generated content is stored locally in your data directory
- No personal data is transmitted to external services except for AI API calls

### Disclaimer

This tool is provided "as is" without warranty. Users are responsible for complying with all applicable laws and service terms when using this application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for the AI capabilities
- [YouTube Transcript](https://www.npmjs.com/package/youtube-transcript) for transcript extraction
- [React](https://reactjs.org/) and the amazing React ecosystem
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
