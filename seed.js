
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

const seedProducts = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    const products  = [
      {
        name: "The Pizzaland",
        image: "/pizza.png",
        description: "Enjoy a delightful pizza with a thin crust, melted cheese, and flavorful sauce.",
        price: 100,
        stock: 100,
      },
      {
        name: "Gopal Locho",
        image: "/locho.png",
        description: "Locho is a spongy and savory Gujarati snack topped with spices, chutney, and sev.",
        price: 30,
        stock: 100,
      },
      {
        name: "Mahesh Pav Bhaji",
        image: "/pav_bhaji.png",
        description: "Pav Bhaji is a spicy mashed vegetable dish served with buttery pav bread.",
        price: 50,
        stock: 100,
      },
      {
        name: "Burger Barn",
        image: "/burger.png",
        description: "A hearty burger with a juicy patty, fresh vegetables, and a toasted bun.",
        price: 80,
        stock: 100,
      },
      {
        name: "Shahi Biryani",
        image: "/biryani.png",
        description: "Savor the royal taste of biryani with aromatic spices and tender meat.",
        price: 120,
        stock: 100,
      },
      {
        name: "Samosa Heaven",
        image: "/samosa.png",
        description: "Crispy samosas stuffed with spiced potatoes and peas, served with chutney.",
        price: 20,
        stock: 100,
      },
      {
        name: "Chole Bhature",
        image: "/chole_bhature.png",
        description: "A classic dish of spicy chickpeas paired with soft, fluffy bhature bread.",
        price: 60,
        stock: 100,
      },
    ];
    

    await Product.deleteMany({})
    await Product.insertMany(products);
    console.log("Products added successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    mongoose.disconnect(); // Close DB connection
  }
};

// Run the seeding function
seedProducts();
