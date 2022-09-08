import express from "express"
import mongoose from "mongoose"

import schema from "./model.js"

const app = express()

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
    password: "qwerty123",
    newPassword: "",
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

app.use("/findbyselected", async (request, response) => {
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

app.use("/deletemanyuser", async (request, response) => {
  let deleteManyUser = await schema.deleteMany({ age: request.body.age })
  let activeuser = await schema.find()
  console.log(activeuser)

  response.status(200).json(deleteManyUser)
})

app.use("/login", async (request, response) => {
  //console.log(request.body)
  let validUser = await schema.find({
    $and: [{ cname: request.body.name }, { password: request.body.password }],
  })

  console.log(validUser[0])
  let statusUpdate = await schema.updateOne(
    {
      cname: validUser[0].cname,
    },
    {
      $set: {
        status: 1,
      },
    },
    {
      upsert: true,
    }
  )

  if (validUser.length > 0) {
    response.status(200).json("successfully")
  } else {
    response.status(401).json("login failed")
  }
})

app.use("/logout", async (request, response) => {
  let userLogout = await schema.findOne({ status: 1 })

  console.log(userLogout)
  if (userLogout !== null) {
    let statusUpdate = await schema.updateOne(
      {
        cname: userLogout[0].cname,
      },
      {
        $set: {
          status: 0,
        },
      },
      {
        upsert: true,
      }
    )
    response.status(200).json(statusUpdate)
  }
  response.status(200).json("Already logged out")
})

app.use("/forgotpassword", async (request, response) => {
  let getByEmailId = await schema.find({ email: request.body.email })
  console.log(getByEmailId)

  if (getByEmailId.length > 0) {
    let setNewPassword = await schema.updateOne(
      { email: getByEmailId[1].email },
      {
        $set: {
          newPassword: request.body.newpassword,
        },
      },
      {
        upsert: true,
      }
    )
    //console.log(setNewPassword)
    response.status(200).json(getByEmailId[1])
  }
  response.status(200).json("email not found")
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
