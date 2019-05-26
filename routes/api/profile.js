const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Load Profile Models

const profile =require('../../models/Profile');
//Load Users Models
const Users=require('../../models/Users');


//@Route:       Get api/profile/test
//@Description: Test profile routes
//@Access:      Public

router.get('/test' ,(req,res)=>
      res.json({msg:'profiles works'}));

//@Route:       Get api/profile
//@Description: Get Current user Profile
//@Access:      Private


router.get('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
     
    const errors={ };
    var userId =  req.user.id;
     profile.findOne({user: userId})
     .then(profile=>{

         if(!profile){
             errors.profile='Profile not found';
             return res.status(404).json(errors)
         }  
         res.json(Profile);
     })
     .catch(err=>console.log(err));
});

router.post('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
     
    const profileFields={};
    profileFields.user=req.user.id;
    if(req.body.handle) profileFields.handle=req.body.handle;
    if(req.body.company) profileFields.company=req.body.company;
    if(req.body.website) profileFields.website=req.body.website;
    if(req.body.location) profileFields.location=req.body.location;
    if(req.body.bio) profileFields.bio=req.body.bio;
    if(req.body.status) profileFields.status=req.body.status;
    if(req.body.githubusername) profileFields.githubusername=req.body.githubusername;
    
    if(typeof req.body.skills !=='undefined'){
        req.body.skills=req.body.skills.split(',');
    }
});


profileFields.social=req.user.id;
if(req.body.youtube) profileFields.youtube=req.body.youtube;
if(req.body.instagram) profileFields.instagram=req.body.instagram;
if(req.body.linkedin) profileFields.linkedin=req.body.linkedin;
if(req.body.facebook) profileFields.facebook=req.body.facebook;
if(req.body.twitter) profileFields.twitter=req.body.twitter;
if(req.body.status) profileFields.status=req.body.status;
if(req.body.githubusername) profileFields.githubusername=req.body.githubusername;

profile.findOne({user:req.user.id}).then(profile=>{
    if(profile){
     
        profile.findOneAndUpdate(){
            
        }
    }
});


module.exports=router;