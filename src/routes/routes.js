
module.exports = app => {
    const bodyParser = require('body-parser');
    //app.use(express.json);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    const UserController = require('./controller/userController');
    const RestaurantController = require('./controller/restaurantController');
    const RestaurantCategoryController = require('./controller/restaurantCategoryController');
    const MenuItemsController = require('./controller/menuItemsController');
    const OrderController = require('./controller/orderController');
    const OrderItemsController = require('./controller/orderItemsController');
    const OrderHistoryController = require('./controller/orderHistoryController');
    const PaymentInfoController = require('./controller/paymentInfoController');
    const DelvieryDriverController = require('./controller/deliverDriverController');
    const MessageController = require('./controller/messageController');






    //User Routes
    app.post("/user/create", UserController.createUser);
    app.get('/user/name/:first_name', UserController.findUserByFirstName);
    app.get('/user', UserController.getAllUsers);
    app.get('/user/id/:_id', UserController.getUserById);

    //Restaurant Routes
    app.post("/restaurant/create",RestaurantController.createRestaurant);
    app.get('/restaurant/:restaurantId',RestaurantController.getRestaurantById);
    app.get('/restaurant/',RestaurantController.getAllRestaurants);
    app.put('/restaurant/update/:restaurantId',RestaurantController.updateRestaurant);
    app.delete('/restaurant/delete/:restaurantId',RestaurantController.deleteRestaurantById);

    //Restaurant Category Routes
    app.post("/restaurantCategory/create",RestaurantCategoryController.createRestaurantCategory);
    app.get("/restaurantCategory/",RestaurantCategoryController.getAllRestaurantCategories);
    app.get("/restaurantCategory/:categoryId",RestaurantCategoryController.getRestaurantCategoryById);
    app.put("/restaurantCategory/update/:categoryId",RestaurantCategoryController.updateRestaurantCategory);
    app.delete("/restaurantCategory/delete/:categoryId",RestaurantCategoryController.deleteRestaurantCategoryById);

    //Menu Items Routes
    app.post("/menuItems/create",MenuItemsController.createMenuItem);
    app.get('/menuItems/menu/:menuItemId',MenuItemsController.getMenuItemById);
    app.get('/menuItems/',MenuItemsController.getAllMenuItems);

    //Input the restaurant Id to get all menu items from that specific restaurant
    app.get('/menuItems/restaurant/:restaurantId',MenuItemsController.getAllMenuItemsForRestaurant);

    app.put('/menuItems/update/:menuItemId',MenuItemsController.updateMenuItem);
    app.delete('/menuItems/delete/:menuItemId',MenuItemsController.deleteMenuItemById);


    //Order Routes
    app.post("/orders/create",OrderController.createOrder);
    app.get("/orders/",OrderController.getAllOrders);
    app.get("/orders/:orderId",OrderController.getOrderById);
    app.get("/orders/user/:userId",OrderController.getOrdersByUserId);
    app.put("/orders/update/:orderId",OrderController.updateOrder);
    app.delete("/orders/delete/:orderId",OrderController.deleteOrderById);

    //Order Item Routes
    app.post("/orderItems/create",OrderItemsController.createOrderItem);
    app.get("/orderItems/",OrderItemsController.getAllOrderItems);
    app.get("/orderItems/:orderItemId",OrderItemsController.getOrderItemById);
    app.put("/orderItems/update/:orderItemId",OrderItemsController.updateOrderItem);
    app.delete("/orderItems/delete/:orderItemId",OrderItemsController.deleteOrderItemById);

    //Order History Routes
    app.post("/orderHistory/create",OrderHistoryController.createOrderStatusHistory);
    app.get("/orderHistory/",OrderHistoryController.getAllOrderStatusHistory);
    app.get("/orderHistory/:historyId",OrderHistoryController.getOrderStatusHistoryById);
    app.put("/orderHistory/update/:historyId",OrderHistoryController.updateOrderStatusHistory);
    app.delete("/orderHistory/delete/:historyId",OrderHistoryController.deleteOrderStatusHistoryById);

    //Payment Info Routes
    app.post("/paymentInfo/create",PaymentInfoController.createPaymentInfo);
    app.get("/paymentInfo/:paymentInfoId",PaymentInfoController.getPaymentInfoById);
    app.get("/paymentInfo/user/:userId",PaymentInfoController.getPaymentInfoByUserId);
    app.put("/paymentInfo/update/:paymentInfoId",PaymentInfoController.updatePaymentInfo);
    app.delete("/paymentInfo/delete/:paymentInfoId",PaymentInfoController.deletePaymentInfoById);

    //Delivery Driver Routes
    app.post("/drivers/create",DelvieryDriverController.createDeliveryDriver);
    app.get("/drivers/",DelvieryDriverController.getAllDeliveryDrivers);
    app.get("/drivers/:driverId",DelvieryDriverController.getDeliveryDriverById);
    app.put("/drivers/update/:driverId",DelvieryDriverController.updateDeliveryDriver);
    app.delete("/drivers/delete/:driverId",DelvieryDriverController.deleteDeliveryDriverById);


    //NEW ORDER PROCESS ROUTE
    app.put("/orders/process/:orderId",OrderController.processOrder);

    //Message Routes

    app.post("/messages/create",MessageController.createMessage);
    app.get("/messages/",MessageController.getAllMessages);
    app.get("/messages/:messageId",MessageController.getMessageById);
    app.get("/messages/:userId1/:userId2",MessageController.getMessagesBetweenUsers);
    app.put("/messages/update/:messageId",MessageController.updateMessage);
    app.delete("/message/delete/:messageId",MessageController.deleteMessageById);






}
