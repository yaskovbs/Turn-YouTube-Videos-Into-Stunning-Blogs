import * as functions from 'firebase-functions';
import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY || 'aVerySecretKey'],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  // In a real app, you would find the user in the database
  const users = {
    '116343535940428579059': { id: '116343535940428579059', displayName: 'Ben' },
  };
  const user = (users as any)[id];
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
      proxy: true, // Important for Firebase Functions
    },
    (accessToken, refreshToken, profile, done) => {
      // In a real app, you would find or create a user in your database
      console.log('Google profile:', profile);
      // For this example, just pass the profile
      done(null, profile);
    },
  ),
);

// API Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

app.get('/auth/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/auth/logout', (req: any, res) => {
  req.logout();
  res.redirect('/');
});

// Expose Express API as a single Cloud Function
export const api = functions.https.onRequest(app);
