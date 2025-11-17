# Blog Generator - YouTube to Blog Conversion App

## Overview
A full-stack web application that converts YouTube videos into blog posts using Google's Gemini AI. Users can paste a YouTube URL, and the app fetches the video transcript and generates a well-formatted blog post using AI.

## Recent Changes (Migration to Replit - November 17, 2025)
- Migrated from Vercel to Replit environment
- Updated Vite configuration to bind to port 5000 with proper host settings for Replit compatibility
- Fixed TypeScript compilation issues and added proper type definitions
- Configured proper client/server separation with Vite proxy
- Updated production server to correctly bind to port 3001
- Added static file serving for production builds
- Reinstalled dependencies to resolve rollup compatibility issues
- Configured development workflow to run both Express backend (port 3001) and Vite frontend (port 5000) simultaneously

## Project Architecture

### Technology Stack
- **Frontend**: React 18.2, Vite 6.3, React Router, Tailwind CSS
- **Backend**: Express 5.1, Node.js
- **Authentication**: Passport.js with Google OAuth 2.0
- **AI Integration**: Google Gemini AI for content generation
- **Session Management**: Cookie-based sessions with encryption

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components (Radix UI)
│   │   ├── pages/         # Page components (Home, About, etc.)
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main application component
│   └── public/            # Static assets
├── server/                # Backend Express application
│   ├── routes/
│   │   └── api.ts         # API routes (blog generation, user management)
│   ├── config/            # Passport configuration
│   └── index.ts           # Express server setup
├── scripts/
│   └── dev.ts             # Development script to run both servers
└── dist/                  # Production build output
    ├── server/            # Compiled TypeScript server
    └── public/            # Built frontend assets
```

### Port Configuration
- **Development**:
  - Frontend (Vite): Port 5000 (exposed to internet via Replit)
  - Backend (Express): Port 3001 (proxied through Vite)
- **Production**:
  - Backend serves both API and static files on port 3001
  - Vite proxy handles routing in development

### Key Features
1. **YouTube Transcript Extraction**: Fetches video transcripts using youtube-transcript library
2. **AI-Powered Blog Generation**: Uses Gemini AI to convert transcripts into well-formatted blog posts
3. **Google OAuth Authentication**: Secure user authentication with Google accounts
4. **Dark Mode Support**: Theme toggling with next-themes
5. **Responsive UI**: Built with Tailwind CSS and Radix UI components

## Environment Variables
The following secrets are required and managed through Replit Secrets:

- `GEMINI_API_KEY`: Google Gemini AI API key for blog generation
- `GOOGLE_CLIENT_ID`: Google OAuth client ID for authentication
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret for authentication
- `COOKIE_KEY`: Secret key for encrypting session cookies (32+ characters recommended)

## Development Workflow

### Running the Application
```bash
npm run dev
```
This starts both the Express backend (port 3001) and Vite frontend (port 5000) simultaneously.

### Building for Production
```bash
npm run build
```
This compiles the TypeScript server and builds the Vite frontend.

### Production Start
```bash
npm start
```
Runs the compiled server with static file serving.

## User Preferences
None documented yet.

## Security Practices
- All API keys and secrets managed through environment variables
- Session cookies encrypted with secure secret key
- Google OAuth with proper callback URL configuration
- CORS properly configured for development and production
- No hardcoded credentials in codebase
- Client/server separation with proper proxy configuration

## Known Issues & Future Improvements
- React Router v7 migration warnings (non-critical)
- Consider implementing database for blog post persistence
- Add comprehensive error handling for API failures
- Implement rate limiting for API endpoints
