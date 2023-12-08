import { Category_Model } from "../models/Category.js"
import slugify from 'slugify'
import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { ApiError } from "../utils/apiError.js"
/** @method get
 *  @router category
 * @public
*/
export const getAllCategory = asyncHandler(async (req, res) => {
  let page = req.query.page * 1 || 1
  let limit = req.query.limit * 1 || 5
  let skip = (page - 1) * limit
  const category = await Category_Model.find({}).skip(skip).limit(limit)
  return res.status(200).json({ results: category.length, page, data: category })
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
@method post
@router category
@private
*/
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newCategory = await Category_Model.create({
    name, slug: slugify(name)
  })
  const save = await newCategory.save()
  return res.status(201).json({ category: save })
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
 * @desc get by id 
 * @Get mothod
 * @public
 */
export const GetById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const category = await Category_Model.findById(id)
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404))
  }
  return res.status(200).json({ data: category })
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
 * @desc put by id 
 * @put mothod
 * @private
 */
export const putById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const category = await Category_Model.findOneAndUpdate({ _id: id },
    { name, slug: slugify(name) }, { new: true })
  if (!category) {
    return res.status(404).json({ mess: `No category for this id ${id}` })
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
  const category = await Category_Model.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ mess: `No category for this id ${id}` })
  }
  return res.status(201).json({ mess: "Deleted successfully" })
})

