
import express from 'express';
import dotenv from 'dotenv';
import { setupStaticServing } from './static-serve.js';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();

// Body parsing middleware with explicit configuration
app.use(express.json({
  limit: '10mb',
  strict: false,
  verify: (req, res, buf) => {
    // Log raw body for debugging
    console.log('Raw request body:', buf.toString());
  }
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// API routes
app.use('/api', apiRouter);

// Export a function to start the server
export async function startServer(port) {
  try {
    if (process.env.NODE_ENV === 'production') {
      setupStaticServing(app);
    }
    app.listen(port, () => {
      console.log(`API Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || 3001);
}
