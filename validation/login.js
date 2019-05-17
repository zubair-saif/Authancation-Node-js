const Validator=require('validator');
const isEmpty =require('./is-empty');

module.exports=function validateLoginInput(data){

    let errors={};

   
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    data.password2=!isEmpty(data.password2)?data.password2:'';

   
   
    if(!Validator.isEmail(data.email)){
        errors.email='Email field is required or not correct';

    }
    if(Validator.isEmpty(data.email)){
        errors.email='Email field is required';
    }
    if(Validator.isEmpty(data.password)){
        errors.password='Passwords field is Required';
    }
    
   
    return{
        errors,
        isValid:isEmpty(errors)
    }
}