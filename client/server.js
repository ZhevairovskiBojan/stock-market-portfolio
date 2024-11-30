const express = require("express"); // Import Express for creating the server.
const mongoose = require("mongoose"); // Import Mongoose for database interaction.
const cors = require("cors"); // Import CORS for cross-origin requests.
const bodyParser = require("body-parser"); // Import body-parser for handling JSON.

const app = express(); // Initialize an Express application.
const PORT = process.env.PORT || 5002; // Set the server port.

// Middleware
app.use(cors()); // Enable CORS to allow requests from other origins (frontend).
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format.

// Import required modules
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Retrieve MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true, // Use the new MongoDB connection string parser
//   useUnifiedTopology: true, // Enable the new unified topology engine for MongoDB
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Schema for Stocks
const stockSchema = new mongoose.Schema({
  company: String, // Name of the company.
  description: String, // Description of the company/stock.
  initial_price: Number, // Initial price of the stock.
  price_2002: Number, // Price in 2002.
  price_2007: Number, // Price in 2007.
  symbol: String, // Stock symbol (e.g., AAPL for Apple).
});

// Model for the stocks
const Stock = mongoose.model("Stock", stockSchema);

// API Endpoint: Get all stocks
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find(); // Fetch all stocks from the database.
    res.json(stocks); // Return the list of stocks as JSON.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Return error message on failure.
  }
});

// API Endpoint: Add a stock to the watchlist
app.post("/api/watchlist", async (req, res) => {
  try {
    const {
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    } = req.body;

    const stock = new Stock({
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    });

    await stock.save(); // Save the stock data to the database.
    res.json({ message: "Stock added to watchlist successfully" }); // Return success message.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Return error message on failure.
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
