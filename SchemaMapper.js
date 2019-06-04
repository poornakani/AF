const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Course:{
        type:String,
        required:true
    },
    PassMark:{
        type:Number,
        required:true
    },
    LecturerInCharge:{
        type:String,
        required:true
    },
    Subjects:{
        type:[mongoose.Schema.Types.ObjectId],

    }
});

const SubjectSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    }
});

mongoose.model('Course',CourseSchema);
mongoose.model('Subject',SubjectSchema);

mongoose.connect('mongodb://127.0.0.1:27017/sliit-web',{useNewUrlParser:true}).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
   console.error(err);
});

module.exports = mongoose;