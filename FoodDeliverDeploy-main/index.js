const express=require("express");
const app=express();
require('dotenv').config();
const {connection}=require("./Config/db");
const {UserRouter}=require("./Router/User")
const {ResturantRouter}=require("./Router/resurant");
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome to our food delivery app")
})

app.use(UserRouter);
app.use(ResturantRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
    console.log(`http://localhost:${process.env.port}`);
})
