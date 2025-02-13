const Cart = require("../models/cart");
const Order = require("../models/order");

const orderPlace = async (req, res) => {
  let userId = req.user.id;
  const { couponCode } = req.body;

  try {
    let getCartProduct = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    // console.log("Cart Product:-", getCartProduct);

    if (!getCartProduct || getCartProduct.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    let subtotal = 0;
    getCartProduct.items.forEach((item) => {
      subtotal += item.productId.price * item.quantity;
    });
    // console.log("Sub Total:-", subtotal);

    const { productId, name, price, quantity } = getCartProduct.items[0];
    // console.log("Value:-", productId, name, price, quantity);
    let discount = 0;

    const nthOrder = (await Order.countDocuments({ userId })) + 1;
    if (couponCode === "10PERCENT" && nthOrder % 2 === 0) {
      discount = subtotal * 0.1;
    }

    const totalAmount = subtotal - discount;
    // console.log("Totla Amount:-", totalAmount);

    const newOrder = new Order({
      userId,
      products: getCartProduct.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
      totalAmount,
      couponApplied: discount > 0,
    });

    await newOrder.save();
    // console.log("order placed");
    // Clear cart
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Order placed successfully.",
      orderDetails: newOrder,
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getOrderByuser = async (req, res) => {
  const userId = req.user.id;

  try {
    let getOrderHistory = await Order.find({ userId });
    // console.log(getOrderHistory);
    if (getOrderHistory && getOrderHistory.length > 0) {
      res.status(200).json({ Total_Order:getOrderHistory.length,OrderDetails: getOrderHistory });
    }
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};

module.exports = { orderPlace, getOrderByuser };
