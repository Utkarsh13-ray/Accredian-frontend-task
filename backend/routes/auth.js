
const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_Secret=process.env.REACT_APP_SECRET;// local.env (it must be safe) 
console.log(JWT_Secret);

router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('Password',"password must be atleast 5 character").isLength({ min: 5 }),
],async (req,res)=>{
   let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const Secpass = await bcrypt.hash(req.body.Password, salt);
        
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"sorry a user with this email already exist"})
        }
        user=await User.create({
            name: req.body.name,
            Password: Secpass,
            email:req.body.email
        })

        const data={
            user:{
                id:user.id
            }
        }
        
        const authtoken = jwt.sign(data,JWT_Secret);
        success=true;
        res.json({success,authtoken});
    }catch (error) {
        console.log(error.message);
         res.status(500).send("some error occured");
    } 
    
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:"please enter the valid email",message:err.message})});
},
)
router.post('/login',[
    body('email',"please enter a valid email").isEmail(),
    body('Password',"Please enter the right credentials").exists(),
],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
         
        const {email,Password}=req.body;
        
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"Please enter the right credentials"})
        }
      const passwordcompare=await bcrypt.compare(Password,user.Password);
      if(!passwordcompare){
        return res.status(400).json({success,error:"Please enter the right credentials"})
      }
        const data={
            user:{
                id:user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_Secret);
        success=true;
        res.json({success,authtoken});
    }catch (error) {
        
         res.status(500).send("Internal server result");
    } 
    
  
  },
  )
  router.get('/getuser',fetchuser,async (req,res)=>{
      try {
          
           const userid=req.user.id;
          const user=await User.findById(userid);
          console.log(user);
          res.send(user);
      } catch (error) {
          res.status(401).send("please authenticate using a valid token");
    }
          
  },
  )

module.exports=router;
