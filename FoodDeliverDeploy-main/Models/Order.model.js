const mongoose=require("mongoose");

const OrderSchema=mongoose.schema(
    {

        user : { type: ObjectId },
        restaurant : { type: ObjectId},
      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: String // e.g, "placed", "preparing", "on the way", "delivered"
   }
);

const OrderModel=mongoose.model("Order",OrderSchema);

module.exports={
    OrderModel
}