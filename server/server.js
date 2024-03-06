require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 5000;
const User = require('./models/user');

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.use(session({
    secret: 'members',
    resave: false,
    saveUninitialized: false, 
}));

app.use(cors({
  origin: ["http://localhost:3000", 
  "https://members-only-app-api.onrender.com"],
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' },
  async function(email, password, done) {
    try {
      // Fetch user from MongoDB
      const user = await User.findOne({ email: email });

      if (!user) { return done(null, false); }

      // Compare passwords
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/users', userRoutes);
app.use('/api/message', messageRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});