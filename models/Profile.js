const mongoose=require('mongoose');
const Schema = mongoose.Schema;

//Create Schema for the profile

const ProfileSchema=new Schema({

     users:{
         type:Schema.Types.ObjectId,
         ref:'Users'
     },
     handle:{
         type:String,
         required:true,
         max:40
     },
     company:{
         type:String
     },
     websites:{
          type:String
     },
     location:{
         type:String
     ,
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[{
        
        title:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        location:{
            type:String
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date
        },
        current:{
            type:Boolean,
            default:false
        },
        descrip:{
            type:String
        }

        


    }],

    Education:[{
        
        school:{
            type:String,
            required:true
        },
        degree:{
            type:String,
            required:true
        },
        fieldOfStudy:{
            type:String,
            required:true

        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date
        },
        current:{
            type:Boolean,
            default:false
        },
        descrip:{
            type:String
        }

        


    }],
    social:{
        facebook:{
            type:String
        },
        instagram:{
            type:String
        },
        youtube:{
            type:String
        },
        linkedin:{
            type:String
        },
        twitter:{
            type:String
        },

    },
    date:{
        type:Date,
        default:Date.now()
    }

    
    



 
});


module.exports=profile=mongoose.model('profile',ProfileSchema);