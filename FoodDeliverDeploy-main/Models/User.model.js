const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
        name: String,
        email: String,
        password: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        }
});

const Usermodel=mongoose.model("user",UserSchema);

module.exports={Usermodel}
