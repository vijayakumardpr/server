import express from "express"
import mongoose from "mongoose"
import MyModel from "./model.js"

const CONNECTION_STRING =
  "mongodb://127.0.0.1:27017/blog?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"
const app = express()
app.use(express.json())

app.use("/createuser", async (req, res) => {
  try {
    let data = await MyModel.updateMany({}, { address: "chennai" })

    data.matchedCount
    data.modifiedCount
    //MyModel.updateMany({}, { $set: { address: 'coimbatore' } });
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

mongoose.connect(CONNECTION_STRING).then(() => {
  app.listen(1982, "localhost", () => console.log("express is working.....!"))
})

// let data = await MyModel.create({
//   name: "Rajesh",
//   gender: "male",
//   age: 21,
// })
// data.name = "Rajesh Don"
// await data.save()

//let data = await MyModel.find({ name: "vijay" })

// MyModel.exists({name: "vijay"})

//let data = await MyModel.deleteOne({ name: "vijay" })

//let data = await MyModel.where("name").equals("vijay")

//where("age").gt(12).lt(25).where("name").equals("vijay").limit(2).select("age")

//populate like joins

// let data = await MyModel.updateMany(
//   {},
//   { $set: { isMarried: false } },
//   (err, datas) => {
//     if (err) throw err
//     console.log("Update user:", datas)
//   }
// )
