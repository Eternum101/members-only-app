const Message = require('../models/message');

exports.createMessage = (req, res) => {
    const { title, text } = req.body;
    const author = req.user._id;

    const message = new Message({
        title,
        text,
        author,
        timestamp: new Date()
    });

    message.save()
        .then(savedMessage => {
            res.status(201).json(savedMessage);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while creating the message.' });
        });
};

exports.findMessage = (req, res) => {
    Message.find().populate('author')
        .then(messages => {
            res.json(messages);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching the messages.' });
        });
};

exports.deleteMessage = (req, res) => {
    const { id } = req.params;

    Message.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Message deleted successfully.' });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while deleting the message.' });
        });
};
