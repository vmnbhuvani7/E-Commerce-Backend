const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
};

exports.checkout = async (req, res) => {
  const cart = req.body;

  try {
    for (let item of cart) {
      const product = await Product.findById(item.id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
    }

    for (let item of cart) {
      const product = await Product.findById(item.id);
      product.stock -= item.quantity;
      await product.save();
      global.io.emit('stockUpdate', { id: item.id, stock: product.stock });
    }

    res.json({ message: 'Checkout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed' });
  }
};
