import { check } from 'express-validator'
export const vaild = () => {
  return [
    // Validation chain for the 'name' field
    check('name')
      .trim()
      .isString()
      .withMessage('Name must be a string')
      .isLength({ min: 3, max: 32 })
      .withMessage('Name must be between 3 and 32 characters')
      .notEmpty()
      .withMessage('Name is required'),
    check("category")
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage("Invalid category ")
  ]
}