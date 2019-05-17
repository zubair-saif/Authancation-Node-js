const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app =express();

//body parser middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Db config
const db=require("./config/keys").mongoURI;

//Mongoose connect to a databases

mongoose
.connect(db,{ useNewUrlParser: true })
.then(()=>(console.log("mongoose connected"))).catch(err=>console.log(err));

//main Route of the application

//passport middleware

app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts', posts);


//app listening on port and defining heroku or other envirnoment variable here 

const port =process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});