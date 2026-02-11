import Order from '../Models/Order.js';
import Cart from '../Models/Cart.js';
import Product from '../Models/Product.js';

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    for (let item of cart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
    });

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
