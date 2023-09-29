const mongoose=require("mongoose");

const ResturantSchema=mongoose.Schema({
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
          name: String,
          description: String,
          price: Number,
          image: String
        }]
});

const Resturantmodel=mongoose.model("resturant",ResturantSchema);

module.exports={ Resturantmodel}
