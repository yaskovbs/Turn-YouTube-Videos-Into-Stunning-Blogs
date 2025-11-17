import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../db/database.js';
import dotenv from 'dotenv';

dotenv.config();

// Get the callback URL based on environment
const getCallbackURL = () => {
    const replitDomain = process.env.REPLIT_DEV_DOMAIN;
    if (replitDomain) {
        return `https://${replitDomain}/auth/google/callback`;
    }
    return 'http://localhost:5000/auth/google/callback';
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: getCallbackURL(),
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await db
          .selectFrom('users')
          .selectAll()
          .where('google_id', '=', profile.id)
          .executeTakeFirst();

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await db
          .insertInto('users')
          .values({
            google_id: profile.id,
            display_name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.displayName, // Fulfilling the non-null constraint for username
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
