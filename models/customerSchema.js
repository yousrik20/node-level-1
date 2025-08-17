const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phonenumber: String,
  age: Number,
  country: String,
  gender: String,
});


// Create a model based on that schema
const User = mongoose.model("customer", userSchema);

 
 
// export the model
module.exports = User;