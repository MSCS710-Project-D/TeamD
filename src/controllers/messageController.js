const Message = require('../models/messageModel');

// Create a new message
async function createMessage(req, res) {
    try {
        const { sender, receiver, content } = req.body;

        const newMessage = new Message({
            sender,
            receiver,
            content,
        });

        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Unable to create message' });
    }
}

// Read message by ID
async function getMessageById(req, res) {
    const messageId = req.params.messageId;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(message);
    } catch (error) {
        console.error('Error fetching message by ID:', error);
        res.status(500).json({ error: 'Unable to fetch message' });
    }
}

// Read all messages
async function getAllMessages(req, res) {
    try {
        const messages = await Message.find();

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching all messages:', error);
        res.status(500).json({ error: 'Unable to fetch messages' });
    }
}

// Get all messages between two users
async function getMessagesBetweenUsers(req, res) {
    const { user1Id, user2Id } = req.params;

    try {
        const userMessages = await Message.find({
            $or: [
                { user1: user1Id, user2: user2Id },
                { user1: user2Id, user2: user1Id },
            ],
        });

        res.status(200).json(userMessages);
    } catch (error) {
        console.error('Error fetching messages between users:', error);
        res.status(500).json({ error: 'Unable to fetch messages between users' });
    }
}

// Update message
async function updateMessage(req, res) {
    try {
        const messageId = req.params.messageId;
        const updateData = req.body;

        const updatedMessage = await Message.findOneAndUpdate(
            { _id: messageId },
            updateData,
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json(updatedMessage);
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Unable to update message' });
    }
}

// Delete message
async function deleteMessageById(req, res) {
    const messageId = req.params.messageId;

    try {
        const deletedMessage = await Message.findByIdAndRemove(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting message by ID:', error);
        res.status(500).json({ error: 'Unable to delete message' });
    }
}

module.exports = {
    createMessage, getMessageById, getAllMessages, getMessagesBetweenUsers, updateMessage, deleteMessageById,
};
