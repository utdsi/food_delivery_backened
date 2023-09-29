const jwt=require("jsonwebtoken")
require('dotenv').config();

const authentication=(req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token);
    let decoded=jwt.verify(token,process.env.Secret);
    if(decoded){
        console.log(decoded);
        req.body.address=decoded.adress;
        req.body.userid=decoded.userid;
        next()
    }else{
        res.status(500).send({"msg":"Invalid login credetinals"})
    }
};

module.exports={
    authentication
}
