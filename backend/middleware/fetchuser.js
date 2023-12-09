var jwt = require('jsonwebtoken');

const JWT_Secret=process.env.REACT_APP_SECRET;

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_Secret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"});   
        console.log(error);
    }
}

module.exports=fetchuser;