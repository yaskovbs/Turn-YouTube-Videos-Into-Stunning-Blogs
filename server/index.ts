const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const cors = require('cors')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()


const app = express()

// Middlewares
app.use(cors())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [process.env.COOKIE_KEY]
    })
)
app.use(passport.initialize())
app.use(passport.session())

// Passport config
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // In a real app, you would find the user in the database
    const users = {
        '116343535940428579059': { id: '116343535940428579059', displayName: 'Ben' }
    }
    const user = users[id]
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://turn-youtube-videos-into-stunning-blogs.onrender.com/api/auth/google/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    // In a real app, you would find or create a user in your database
    console.log('Google profile:', profile)

    // For this example, just pass the profile
    done(null, profile)
  }
));

// API Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
})

app.get('/auth/current_user', (req, res) => {
    res.send(req.user)
})

app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})