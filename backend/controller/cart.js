const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  const { productId, name, price, quantity = 1 } = req.body;
//   console.log("Req user:-", req.user);
  const userId = req.user.id;
try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }

    await cart.save();
    res.status(200).json({msg:cart,success:true});
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

const getCartProduct=async(req,res)=>{
    console.log("get cart product");
    const userId = req.user.id;

    try {
      const cart = await Cart.findOne({ userId }).populate("items.productId");
  
      if (!cart) {
        return res.status(200).json({ items: [] });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = { addToCart,getCartProduct };
