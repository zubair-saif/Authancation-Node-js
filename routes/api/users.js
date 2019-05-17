const express=require("express");
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const passport=require('passport');
const keys=require('../../config/keys');


//load input Validation 

const  validateRegisterInput=require('../../validation/register');
const  validateLoginInput=require('../../validation/login');
//load users Models

const Users =require('../../models/Users');

//@Route:       Get api/private/test
//@Description: Test private routes
//@Access:      Private

router.get('/test' ,(req,res)=> res.json({msg:'users works'}));


//@Route:       Get api/users/register
//@Description: register routes
//@Access:      Public


router.post('/register',(req ,res)=>{
    
    const {errors, isValid}=validateRegisterInput(req.body);

    //check validation

    if(!isValid){
    return res.status(400).json(errors);
    }
    

   Users.findOne({email:req.body.email})
    .then(users=>{
        if(users){
            errors.email="email already exsit"
            return res.status(400).json(errors);
        }else{
        
         //get avatar by email    
            const avatar=gravatar.url(req.body.email,{
                s:'200', //size
                r:'pg',  //rating
                d:'default' //default
            });

            const newUsers=new Users({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar,
                date:req.body.date
            });
          
      //bcrypt the password 

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUsers.password,salt,(err,hash)=>{

                    if(err) throw err;
                    newUsers.password=hash;
                    newUsers.save()
                    .then(users=>res.json(users))
                    .catch(err=>console.log(err));
                    
                })
            })
        }
    });
});

//@Route:       Get api/users/login
//@Description: login routes returning JWT token
//@Access:      Public

router.post('/login',(req , res)=>{
       

    const {errors, isValid}=validateLoginInput(req.body);

    //check validation

    if(!isValid){
    return res.status(400).json(errors);
    }

    const email=req.body.email;
    const password=req.body.password;

    // find user by email
    Users.findOne({email})
    .then(users=>{
         
        //check for user
        if(!users)
        {
            errors.email='User not found';
            return res.status(404).json(errors);
        }
       //check password

       bcrypt.compare(password,users.password)
       
       .then(isMatch=>{
           if(isMatch){

            //    res.json({msg:'success'});

            //user matched

            const payload={id:users.id,name:users.name,password:users.password,avatar:users.avatar} //create jwk payload
            
            //sign token
            jwt.sign(payload,
                keys.secretOrKey,
                {expiresIn:3600},
                (err,token)=>{
                  res.json({
                      success:true,
                      token:'Bearer ' + token

                  });
                });

           }
           else{
               errors.password='Password is incorrect';
               return res.status(400).json(errors);
           }
       })

    });
     


});


//@Route:       Get api/users/current
//@Description: current routes returning current user
//@Access:      Private

router.get('/current',passport.authenticate('jwt',{session:false}), (req , res)=>{
    res.json({msg:'success'});
})

module.exports=router;