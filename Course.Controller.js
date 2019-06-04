const mongoose = require('../DBSchema/SchemaMapper');
const Course = mongoose.model('Course');

var CourseController = function(){
    this.Insert = (data)=>{
        return new Promise((resolve,reject)=>{
            let course = new Course({
                Name:data.Name,
                Course:data.Course,
                PassMark:data.PassMark,
                LecturerInCharge:data.LecturerInCharge,
                Subjects:data.Subjects
            });
            course.save().then(()=>{
                resolve({status:200,message:'Course added successfully'});
            }).catch((err)=>{
                reject({status:200,message:'Course creation failed due to Error: '+err});
            });
        })
    };

    this.retrieve = ()=>{
        return new Promise((resolve,reject)=>{
            Course.find().then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.retrieveByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Course.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.update = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let course = {
                Name:data.Name,
                Course:data.Course,
                PassMark:data.PassMark,
                LecturerInCharge:data.LecturerInCharge,
                Subjects:data.Subjects
            };
            Course.findByIdAndUpdate({_id: id},course).then(()=>{
                resolve({status:200,message:'Course updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Course updating failed due to Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Course.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:'Deletion Successful'});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }
};

module.exports = new CourseController();