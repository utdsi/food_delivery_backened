const express=require("express");
const ResturantRouter=express.Router();
const {Resturantmodel}=require("../Models/Resturant.model");
const {authentication}=require("../Middleware/authentication");
const {OrderModel}=require("../Models/Resturant.model");

// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJ1c2VyaWQiOiI2NDRjYzJjYjhiNjZmYTBmNmZjODM2MGYiL
// CJhZHJlc3MiOnsic3RyZWV0IjoiQi8yMiIsImNpdHkiOiJBbGxhaGFiYWQiLCJ
// zdGF0ZSI6IlVQIiwiY291bnRyeSI6IkluZGlhIiwiemlwIjoiMjEyMTAzIn0sImlh
// dCI6MTY4Mjc1NzIyM30.LqIFMzcP0JbijMd6QoUDLBVJdt-ejGY0zCbjuLKY6sM
ResturantRouter.post("/api/resturant/register",async(req,res)=>{
    try {
        console.log(req.body);
        let restData=new Resturantmodel(req.body);
        await restData.save();
        res.status(201).send({"msg":"resturants added"})
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});


ResturantRouter.get("/api/restaurants",async(req,res)=>{
    try {
        let restData=await Resturantmodel.find();
        res.status(200).send(restData)
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});
ResturantRouter.get("/api/restaurants/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let restData=await Resturantmodel.findById({_id:id});
        res.status(200).send(restData)
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});

ResturantRouter.get("/api/restaurants/:id/menu",async(req,res)=>{
    try {
        let id=req.params.id
        let restData=await Resturantmodel.findById({_id:id});
        console.log(restData);
        let menu=restData.menu
        res.status(200).send(menu)
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});
ResturantRouter.patch("/api/restaurants/:id/menu",async(req,res)=>{
    try {
        let id=req.params.id;
        let newMenu=req.body;
        let restData=await Resturantmodel.findById({_id:id});
        let addmenu=restData.menu
        let newdata=addmenu.push(newMenu);
        let menu=restData.menu;
        let addDb=await Resturantmodel.findByIdAndUpdate({_id:id},restData)
        res.status(200).send({"msg":"new menu added"})
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});
ResturantRouter.delete("/api/restaurants/:id/menu/:mid",async(req,res)=>{
    try {
        let {id,mid}=req.params;
        console.log(req.params);
        let data=await Resturantmodel.findById({_id:id});
       let newdata= data.menu.filter((item)=>{
        let id=item.id
        id=id.toString()
        console.log(id);
       return id!==mid
       });
       data.menu=newdata
    console.log(data);
       let Deletdatamanu=await Resturantmodel.findByIdAndUpdate({_id:id},data);
        res.status(200).send({"msg":"particular menu deleted"})
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});

ResturantRouter.post("/api/orders",authentication,async(req,res)=>{
    try {
        let {ordername,quantity,userid,address}=req.body;
        let resturantData=await Resturantmodel.find();
       let datas= resturantData.map((item)=>{
            let check=false;
            let price=0;
           for(let i=0;i<item.menu,length;i++){
            if(item.menu.name==ordername){
                price=item.menu.price;
                check=true
            }
           }
           let id=item._id
           if(check&&price!=0){
            return {
                price,id,
            }
           }
        });
        console.log(datas);
        let new_price=datas.price*quantity;
        let resturant=datas.id;
        let itemarr=[];
        let itemobj={
            name: ordername,
            price: datas.price,
            quantity
        };
        itemarr.push(itemobj);
        let totalprice=new_price
        let orderPost={
            user:userid,
            resturant,
            items:itemarr,
            totalprice,
            deliveryAddress:address,
            status:"placed"
        };
        let savedOrderdata=new OrderModel(orderPost);
        await savedOrderdata.save()
        res.status(200).send({"msg":"order has been made"})
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
})





module.exports={
    ResturantRouter
}
