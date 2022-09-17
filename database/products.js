const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  default_price: Number,
  created_at: Date,
  updated_at: Date,
  category_id: Number,
  related_products: Array,
  features: Array,
  styles: Array,
});

const Product = mongoose.model("Product", productSchema);

const featureSchema = new mongoose.Schema({
  id: Number,
  feature: String,
  value: String,
});

const Feature = mongoose.model("Feature", featureSchema);

const styleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sale_price: Number,
  default: Boolean,
  skus: Array,
  photos: Array,
});

const Style = mongoose.model("Style", styleSchema);

const skuSchema = new mongoose.Schema({
  sku: Number,
  quantity: Number,
  size: String,
});

const SKU = mongoose.model("SKU", skuSchema);

const photoSchema = new mongoose.Schema({
  id: Number,
  url: String
  thumbnail_url: String
});

const Photo = mongoose.model("Photo", photoSchema);

const cartSchema = new mongoose.Schema({
  cookie_id: String,
  products: Array
});

const Cart = mongoose.model("Cart", cartSchema);

mongoose.connect("mongodb://localhost/productsDB");

// models
