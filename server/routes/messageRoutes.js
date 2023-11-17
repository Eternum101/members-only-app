const express = require('express');
const router = express.Router();
const { createMessage, findMessage } = require('../controllers/messageController');

router.post('/', createMessage);
router.get('/', findMessage);

module.exports = router;
