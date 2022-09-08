import mongoose from "mongoose"

const schemaName = mongoose.Schema({
  cid: Number,
  cname: String,
  email: String,
  dob: String,
  age: Number,
  salary: Number,
  did: Number,
  designation: String,
  pincode: Number,
  pancard: String,
  mobileNumber: Number,
  status: Number,
  authKey: String,
  password: String,
  newPassword: String,
})

export default mongoose.model("customer", schemaName)

// email:{
//   type: String,
//   minLength:10,
//   required: true,
//   lowercase: true
// }

//bestFriend: mongoose.SchemaTypes.ObjectId,

// createdAt: {
//   type: Date,
//   immediate: true,
//   default: () => Date.now()
// }

// age:{
//   type: Number,
//   min:1,
//   max:100,
//   validate: {
//      validator: v => v % 2 === 0,
//      messages:props => `${props.value} is not an even number`
// }
// }
