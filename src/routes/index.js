const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');
const RestaurantCategoryController = require('../controllers/restaurantCategoryController');
const MenuItemsController = require('../controllers/menuItemsController');
const OrderController = require('../controllers/orderController');
const OrderItemsController = require('../controllers/orderItemsController');
const OrderHistoryController = require('../controllers/orderHistoryController');
const PaymentInfoController = require('../controllers/paymentInfoController');
const DelvieryDriverController = require('../controllers/deliverDriverController');
const Restaurant = require('../models/restaurantModel');
const path = require('path');
const fs = require('fs');
const MessageController = require('../controllers/messageController');
const userRoutes = require('./user');

router.get('/restaurant-images/:restaurant_id', async (req, res) => {
    const restaurantId = req.params.restaurant_id;
    
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            console.log(`Restaurant with ID ${restaurantId} not found in the database.`);
            return res.status(404).send('Restaurant not found');
        }

        if (!restaurant.restaurantImg) {
            console.log(`Image name not set for restaurant with ID ${restaurantId}.`);
            return res.status(404).send('Image name not found for the given restaurant ID');
        }

        console.log("restaurantImg:", restaurant.restaurantImg);
        const imageName = path.basename(restaurant.restaurantImg);
        console.log("imageName:", imageName);
        const imagePath = path.join(__dirname, 'restaurant-images', imageName);
        console.log("imagePath:", imagePath);


        console.log("Constructed image path:", imagePath); // Log the constructed image path

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error(`Error accessing image: ${imageName}`, err);
                return res.status(404).send('Image not found');
            }
            res.sendFile(imagePath);
        });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});



router.post("/restaurant/create",RestaurantController.createRestaurant);
router.get('/restaurant/:restaurantId',RestaurantController.getRestaurantById);
router.get('/restaurant/',RestaurantController.getAllRestaurants);
router.put('/restaurant/update/:restaurantId',RestaurantController.updateRestaurant);
router.delete('/restaurant/delete/:restaurantId',RestaurantController.deleteRestaurantById);

//Restaurant Category Routes
router.post("/restaurantCategory/create",RestaurantCategoryController.createRestaurantCategory);
router.get("/restaurantCategory/",RestaurantCategoryController.getAllRestaurantCategories);
router.get("/restaurantCategory/:categoryId",RestaurantCategoryController.getRestaurantCategoryById);
router.put("/restaurantCategory/update/:categoryId",RestaurantCategoryController.updateRestaurantCategory);
router.delete("/restaurantCategory/delete/:categoryId",RestaurantCategoryController.deleteRestaurantCategoryById);

//Menu Items Routes
router.post("/menuItems/create",MenuItemsController.createMenuItem);
router.get('/menuItems/menu/:menuItemId',MenuItemsController.getMenuItemById);

//Input the restaurant Id to get all menu items from that specific restaurant
router.get('/menuItems/restaurant/:restaurantId',MenuItemsController.getAllMenuItemsForRestaurant);

router.put('/menuItems/update/:menuItemId',MenuItemsController.updateMenuItem);
router.delete('/menuItems/delete/:menuItemId',MenuItemsController.deleteMenuItemById);

// Mount the individual routers
router.use('/', userRoutes);


router.post("/orders/create",OrderController.createOrder);
router.get("/orders/",OrderController.getAllOrders);
router.get("/orders/:orderId",OrderController.getOrderById);
router.get("/orders/user/:userId",OrderController.getOrdersByUserId);
router.put("/orders/update/:orderId",OrderController.updateOrder);
router.delete("/orders/delete/:orderId",OrderController.deleteOrderById);
router.get('/orders/history/:userId',OrderController.getOrdersByUserId);

 //Delivery Driver Routes
 router.post("/drivers/create",DelvieryDriverController.createDeliveryDriver);
 router.get("/drivers/",DelvieryDriverController.getAllDeliveryDrivers);
 router.get("/drivers/:driverId",DelvieryDriverController.getDeliveryDriverById);
 router.put("/drivers/update/:driverId",DelvieryDriverController.updateDeliveryDriver);
 router.delete("/drivers/delete/:driverId",DelvieryDriverController.deleteDeliveryDriverById);

 //NEW ORDER PROCESS ROUTE
router.put("/orders/process/:orderId",OrderController.processOrder);

//Message Routes
router.post("/messages/create",MessageController.createMessage);
router.get("/messages/",MessageController.getAllMessages);
router.get("/messages/:messageId",MessageController.getMessageById);
router.get("/messages/:userId1/:userId2",MessageController.getMessagesBetweenUsers);
router.put("/messages/update/:messageId",MessageController.updateMessage);
router.delete("/message/delete/:messageId",MessageController.deleteMessageById);



module.exports = router;
