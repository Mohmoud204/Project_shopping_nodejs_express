import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema({
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
  }
}, { timestamps: true });

export const Brand_Model = mongoose.model('Brand', BrandSchema);


