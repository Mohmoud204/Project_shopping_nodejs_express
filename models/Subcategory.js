import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category required"],
    trim: true,
    minlength: [3, "Too short category name"],
    maxlength: [32, "Too long category name"],
    unique: [true, "Category must be unique"]
  },
  slug: {
    type: String,
    lowercase: true
  },
  images: {
    type: Object,
    default: {
      url: "",
      publicId: null
    }
  },
  'category': {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "SubCategory must be belong to main parent category"]
  }
}, { timestamps: true });

export const Subcategory_Model = mongoose.model('SubCategory', subcategorySchema);


