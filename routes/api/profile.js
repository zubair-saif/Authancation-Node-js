const express=require("express");
const router=express.Router();

//@Route:       Get api/profile/test
//@Description: Test profile routes
//@Access:      Public

router.get('/test' ,(req,res)=> res.json({msg:'profiles works'}));


module.exports=router;