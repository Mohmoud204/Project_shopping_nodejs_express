import express from "express"
import dotenv from "dotenv"
import { connect_db } from "./config/db.js"
import { ApiError } from "./utils/apiError.js"
import { globalError } from "./middleware/errorMiddleware.js"
import cors from "cors"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
import categoryRouter from "./routes/Category_router.js"
import subcategoryRouter from "./routes/Subcategories_router.js"
const port = 3000 || process.env.PORT_SERVER
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/subcategory", subcategoryRouter)
app.all("*", (req, res, next) => {

  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
})
app.use(globalError);
app.listen(port, () => {
  console.log(`localhost:${port}`);
  connect_db()
})