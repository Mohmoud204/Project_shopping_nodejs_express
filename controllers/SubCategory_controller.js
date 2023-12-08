import { Subcategory_Model } from "../models/Subcategory.js"
import slugify from 'slugify'
import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { ApiError } from "../utils/apiError.js"
/*
 * @desc getAll subCategory 
 * @get method
 * @access puplic 
 * @path /subCategory
 
*/
export const getAll_subCategory = asyncHandler(async (req, res) => {
  let page = req.query.page * 1 || 1
  let limit = req.query.limit * 1 || 5
  let skip = (page - 1) * limit

  let filterObject = {}
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId }
  }

  const category = await Subcategory_Model.find(filterObject).skip(skip).limit(limit)
  return res.status(200).json({ results: category.length, page, data: category })
})
/*
 * @desc create subCategory 
 * @Post method
 * @access private 
 * @path /subCategory
 */
export const create_subCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newCategory = await Subcategory_Model.create({
    name, slug: slugify(name), category
  })
  const save = await newCategory.save()
  return res.status(201).json({ category: save })
})
/*
@pablic
@ get 
get data by id 
*/
export const GetById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const category = await Subcategory_Model.findById(id)
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404))
  }
  return res.status(200).json({ data: category })
})
/*
@private
@put 
put data by id 
*/
export const putById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const category = await Subcategory_Model.findOneAndUpdate({ _id: id },
    { name, slug: slugify(name) }, { new: true })
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404))
  }
  return res.status(201).json({ data: category })
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
 * @desc delet by id 
 * @delet mothod
 * @private
 */
export const deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const category = await Subcategory_Model.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404))
  }
  return res.status(201).json({ mess: "Deleted successfully" })
})
