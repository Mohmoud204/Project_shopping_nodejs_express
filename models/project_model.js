const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title should be at least 3 characters'],
    maxlength: [100, 'Title should not exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description should be at least 20 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  sold: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
    maxlength: [20, 'Price should not exceed 20 characters']
  },
  priceAfterDiscount: {
    type: Number
  },
  color: {
    type: [String]
  },
  imageCover: {
    type: String,
    required: [true, 'Image cover is required']
  },
  image: {
    type: [String]
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "SubCategory must be belong to main parent category"]
  },
  subcategory: [{
    type: mongoose.Schema.ObjectId,
    ref: "SubCategory",
    // required: [true, "SubCategory must be belong to main parent category"]
  }],
  brands: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
  },
  ratingAverage: {
    type: Number,
    min: [1, "Rating must be above or equal 1.0"],
    max: [5, "Rating must be below or equal 1.0"]
  },
  ratingsQuantity :{
    type:Number,
    default:0
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
