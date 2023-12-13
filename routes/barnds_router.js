import express from "express"
const router = express.Router()
import { getAllCategory, createCategory, GetById, putById, deleteById } from "../controllers/Brands_controller.js"
import { vaild, paramsid } from "../validation/Category.js"
router.route("/")
  .get(getAllCategory)
  .post(vaild(), createCategory)
router.route("/:id")
  .get(paramsid(), GetById)
  .put(paramsid(), putById)
  .delete(paramsid(), deleteById)
export default router