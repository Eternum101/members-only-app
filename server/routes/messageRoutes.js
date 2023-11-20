const express = require('express');
const router = express.Router();
const { createMessage, findMessage, deleteMessage } = require('../controllers/messageController');

router.post('/', createMessage);
router.get('/', findMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
