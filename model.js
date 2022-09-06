import mongoose from "mongoose"

const schmaName = mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
})

export default mongoose.model("MyModel", schmaName)

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
