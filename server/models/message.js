const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: String,
    timestamp: Date,
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});

module.exports = Message = mongoose.model('Message', MessageSchema);