import mongoose from "mongoose"

export const connect_db = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DATA_BASE)
    console.log("coonect access")
  } catch (e) { console.log(e); }
}
