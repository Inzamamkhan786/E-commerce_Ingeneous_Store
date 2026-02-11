import express from 'express'
import {
     addToCart,
     removeItem,
     updateQuantity,
     getCart
} from "../Controllers/cartController.js";

const router = express.Router();

//Add item to cart;
router.post('/add', addToCart);

// Remove the item from the Cart
router.post('/remove',removeItem);

// Update the item in the cart;
router.post('/update', updateQuantity);

// Get the item from the Cart;
router.get('/:userId',getCart);

export default router;