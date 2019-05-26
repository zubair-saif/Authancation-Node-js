const express=require("express");
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const config = require("../config/keys");
const Users =require('../../models/Users');




 verifyToken = function(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,config.secretOrKey, function (err, payload) {
        console.log(payload)
        if (payload) {
            Users.findById(payload.userId).then(
                (doc)=>{
                    req.user=doc;
                    next();
                }
            )
        } else {
           res("Token Not Verified");
        }
    })
};

module.exports = verifyToken;
