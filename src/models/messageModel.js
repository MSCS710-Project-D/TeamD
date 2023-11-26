const mongoose = require('mongoose');

// Define the Message Schema
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;
