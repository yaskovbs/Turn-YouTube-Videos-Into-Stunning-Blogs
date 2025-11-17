import express from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRoutes from './routes/api.js'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [process.env.COOKIE_KEY]
    })
)
app.use(passport.initialize())
app.use(passport.session())

// API Routes
app.use('/api', apiRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
            return next()
        }
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })
}

// Passport config
passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser((id: string, done) => {
    // In a real app, you would find the user in the database
    const users = {
        '116343535940428579059': { id: '116343535940428579059', displayName: 'Ben' }
    }
    const user = users[id as keyof typeof users]
    done(null, user)
})

// Get the callback URL based on environment
const getCallbackURL = () => {
    const replitDomain = process.env.REPLIT_DEV_DOMAIN
    if (replitDomain) {
        return `https://${replitDomain}/auth/google/callback`
    }
    return 'http://localhost:5000/auth/google/callback'
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: getCallbackURL(),
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    // In a real app, you would find or create a user in your database
    console.log('Google profile:', profile)

    // For this example, just pass the profile
    done(null, profile)
  }
));

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/')
})

// API Routes for Vercel deployment
// All routes are prefixed with /api/ to match vercel.json rewrites
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication, redirect to the frontend's home page.
    res.redirect('/')
})

app.get('/api/auth/current_user', (req, res) => {
    res.send(req.user)
})

app.get('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err)
        }
        res.redirect('/')
    })
})


// Export the startServer function for development
export async function startServer(port: number = 3001) {
    return new Promise<void>((resolve) => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
            resolve()
        })
    })
}

// Start server directly if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
