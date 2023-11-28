const MenuItem = require('../models/menuItemsModel');

// Create a new menu item
async function createMenuItem(req, res) {
    try {
        const {
            restaurant_id,
            name,
            description,
            price,
            availability,
            image_url,
            allergy_info,
            calories       
        } = req.body;

        // Create a new menu item document
        const newMenuItem = new MenuItem({
            restaurant_id,
            name,
            description,
            price,
            availability,
            image_url,
            allergy_info, 
            calories       
        });

        // Save the menu item to the database
        const savedMenuItem = await newMenuItem.save();

        res.status(201).json(savedMenuItem);
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Unable to create menu item' });
    }
}

// Read all menu items for a specific restaurant
async function getAllMenuItemsForRestaurant(req, res) {
    const restaurantId = req.params.restaurantId;

    try {
        const menuItems = await MenuItem.find({ restaurant_id: restaurantId });

        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items for restaurant:', error);
        res.status(500).json({ error: 'Unable to fetch menu items' });
    }
}

// Read a menu item by ID
async function getMenuItemById(req, res) {
    const menuItemId = req.params.menuItemId;

    try {
        const menuItem = await MenuItem.findById(menuItemId);

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item by ID:', error);
        res.status(500).json({ error: 'Unable to fetch menu item' });
    }
}

// Update a menu item by ID
async function updateMenuItem(req, res) {
    try {
        const menuItemId = req.params.menuItemId;
        const updateData = req.body;

        // Use findOneAndUpdate to find and update the menu item by ID
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            menuItemId,
            updateData,
            { new: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json(updatedMenuItem);
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Unable to update menu item' });
    }
}

// Delete a menu item by ID
async function deleteMenuItemById(req, res) {
    const menuItemId = req.params.menuItemId;

    try {
        const deletedMenuItem = await MenuItem.findByIdAndRemove(menuItemId);

        if (!deletedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting menu item by ID:', error);
        res.status(500).json({ error: 'Unable to delete menu item' });
    }
}

module.exports = {
    createMenuItem, getAllMenuItemsForRestaurant, getMenuItemById, updateMenuItem, deleteMenuItemById,
};
