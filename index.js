import express from "express"
import mongoose from "mongoose"

import schema from "./model.js"

const app = express()

//console.log(express())

app.use(express.json())

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/blog"

app.use("/createuser", async (request, response) => {
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
    authKey: "abc123",
  })
  response.status(200).json(data)
})

app.use("/allrecords", async (request, response) => {
  try {
    let data = await schema.find()
    response.status(200).json(data)
  } catch {
    response.status(500).json("error")
  }
})

app.use("/findselected", async (request, response) => {
  let data = await schema.find({ name: request.body.name })
  response.status(200).json(data)
})

app.use("/updatesingleuser", async (request, response) => {
  //console.log(request.body);
  let data = await schema.updateOne(
    { mobileNumber: request.body.number },
    {
      $set: {
        cname: request.body.name,
      },
    }
  )

  response.status(200).json(data)
})

app.use("/updatemultiuser", async (request, response) => {
  //console.log(request.body);
  let data = await schema.updateMany(
    {},
    {
      $set: {
        salary: request.body.salary,
      },
    }
  )

  response.status(200).json(data)
})

app.use("/deleteoneuser", async (request, response) => {
  let deleteoneuser = await schema.deleteOne({ cname: request.body.name })
  let activeuser = await schema.find()
  console.log(activeuser)

  response.status(200).json(deleteoneuser)
})

app.use("/login", async (request, response) => {
  //console.log(request.body)
  let validUser = await schema.find({
    $or: [{ cname: request.body.name }, { age: request.body.age }],
  })

  console.log(validUser)
  const { name, age } = request.body
  console.log(name, age)

  if (validUser.cname === name) {
    if (validUser.age !== age) {
      response.status(200).json("incorrect password")
    }
    response.status(200).json("successfully")
  } else {
    response.status(401).json("login failed")
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
