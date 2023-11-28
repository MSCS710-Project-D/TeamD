const { object } = require('firebase-functions/v1/storage');
const mongoose = require('mongoose');

// Define the Order Schema
const orderSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Foreign Key reference to Users
        required: true,
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Foreign Key reference to Restaurants
        required: true,
    },
    order_status: {
        type: String,
        enum: ['Placed', 'In Progress', 'Completed', 'Canceled'],
        default: 'Placed'
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    delivery_address: String,
    total_price: {
        type: Number,
        required: true,
    },
    payment_info: {
        type: object
    },
    order_items: {
        type: Array
    },
    payment_info_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentInfo', // Foreign Key reference to PaymentInfo
    },
    driver: {
        type: String,
        ref: "deliveryDriver"
    },
    tax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },

});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
