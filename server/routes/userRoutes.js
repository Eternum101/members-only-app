const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createUser } = require('../controllers/userController');

router.post('/', createUser);
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router;
