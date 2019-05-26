const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const keys = require('./keys');


const optn={};

optn.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optn.secretOrKey=keys.secretOrKey;


module.exports=passport=>{
    passport.use(new jwtStrategy(optn,(jwt_payload , done)=>{
        done(null,jwt_payload);

    }));
}