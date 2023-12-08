import express from "express"
const router = express.Router({ mergeParams: true })
import { vaild } from "../validation/Subcategory_vaild.js"
import { paramsid } from "../validation/Category.js"
import { create_subCategory, getAll_subCategory, GetById, putById, deleteById } from "../controllers/SubCategory_controller.js"
router.route("/")
  .post(vaild(), create_subCategory)
  .get(getAll_subCategory)
router.route("/:id")
  .get(paramsid(), GetById)
  .put(paramsid(), putById)
  .delete(paramsid(), deleteById)
export default router