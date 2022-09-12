import express from "express"
import mongoose from "mongoose"

import schema from "./model.js"

const app = express()

app.use(express.json())

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/blog"

function randomAuthKey() {
  let authkey = ""
  for (let i = 0; i < 7; i++) {
    authkey += Math.floor(Math.random() * 9)
  }
  return authkey
}

app.use("/createuser", async (request, response) => {
  try {
    let data = await schema.create({
      cid: 1,
      cname: "vijayakumar",
      email: "vijayakumar@gmail.com",
      dob: "1995-05-05",
      age: 25,
      salary: 35000,
      did: 1,
      designation: "web developer",
      pincode: 641602,
      pancard: "AOOPV1204E",
      mobileNumber: 9629096390,
      status: 0,
      authKey: "",
      password: "qwerty123",
    })
    response.status(200).json(data)
  } catch {
    response.status(400).json("something problem!")
  }
})

app.use("/showrecords", async (request, response) => {
  try {
    let data = await schema.find()
    response.status(200).json(data)
  } catch {
    response.status(400).json("something problem in all records!")
  }
})

app.use("/selectedrecords", async (request, response) => {
  const { name } = request.body
  try {
    let data = await schema.find({ cname: name })
    response.status(200).json(data)
  } catch {
    response.status(200).json("something problem in selected row!")
  }
})

app.use("/findandmodify", async (request, response) => {
  const { id } = request.body
  try {
    //const { email, password } = request.body
    let data = await schema.findByIdAndUpdate(
      { _id: id },
      { $set: { age: 19, designation: "MEAN Stack" } }
    )

    response.status(200).json(data)
  } catch {
    response.status(400).json("something problem in selected row!")
  }
})

app.use("/login", async (request, response) => {
  const { name, password } = request.body
  try {
    let loginUser = await schema.find({
      $and: [{ cname: name }, { password: password }],
    })

    if (loginUser.length > 0) {
      let updateUser = await schema.updateOne(
        { cname: loginUser[0].cname },
        {
          $set: { authKey: randomAuthKey() },
        }
      )
      console.log(updateUser)
    }
    response.status(200).json(loginUser)
  } catch {
    response.status(400).json("something problems in login")
  }
})

app.use("/updateuser", async (request, response) => {
  const { key } = request.body
  try {
    let updatedUser = await schema.updateOne(
      { authKey: key },
      {
        $inc: { age: 1 },
      }
    )
    response.status(200).json(updatedUser)
  } catch {
    response.status(400).json("something problem in update user")
  }
})

app.use("/deleteoneuser", async (request, response) => {
  const { key } = request.body
  try {
    let deleteoneuser = await schema.deleteOne({ authKey: key })
    let activeuser = await schema.find()
    response.status(200).json("deletedUser", deleteoneuser)
    response.status(200).json("ActiveUser", activeuser)
  } catch {
    response.status(400).json("something problems in delete rows")
  }
})

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    app.listen(3030, "localhost", () => {
      console.log("success ")
    })
  })
  .catch((error) => {
    console.log(error)
  })
