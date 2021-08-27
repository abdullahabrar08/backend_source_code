const dynamoose = require("dynamoose");
const Course = require('../Models/CourseModel');
const uuid = require("uuid");

const addCourse = async (req, res, next) => {
    console.log("request received", req.body);
   let course = new Course({
       id: uuid.v1(),
       description: req.body.description,
       url: req.body.url,
       category: req.body.category.toLowerCase(),
       createdAt: Date.now(),
       description2: req.body.description2,
       description3: req.body.description3, 
       language: req.body.language 
   });


  await course
      .save()
      .then((response) =>{
         res.json({
            status: 'OK' ,
            code: 200,
            message : 'Course saved'
        })
       })
       .catch((err) =>{
            res.json({
             status: 'Bad Request' ,
             code: 400,
             message : 'server side issue'
           })
       })
}

const getCourses = async (req,res, next) => {
   await Course
        .scan(new dynamoose.Condition().where("category").eq(req.body.category.toLowerCase()))
        .exec().then((response) =>{
           let feed = []
           if(response.count > 0){
              for(var i = 0 ; i < response.count ; i++){
                 feed.push(response[i]);
              }

              feed.sort((a,b) => {
               return  new Date(b.createdAt) - new Date(a.createdAt);
            })

             res.json({
                status: 200,
                message: "Courses exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no Courses exist",
               feed: feed
            })
           }
         }).catch((err) =>{
            res.json({
               status: 400,
               message: "server failure",
            })
         });
}

const getAllCourses = async (req,res, next) => {
   await Course
        .scan()
        .exec().then((response) =>{
           let feed = []
           if(response.count > 0){
              for(var i = 0 ; i < response.count ; i++){
                 feed.push(response[i]);
              }

              feed.sort((a,b) => {
               return  new Date(b.createdAt) - new Date(a.createdAt);
            })

             res.json({
                status: 200,
                message: "Courses exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no Course exist",
               feed: feed
            })
           }
         }).catch((err) =>{
            res.json({
               status: 400,
               message: "server failure",
            })
         });
}

const deleteSpecificCourse = async (req, res, next) => {
   await Course.delete({id: req.body.id}, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "Course deleted",
         });
      }
   });
}

const updateSpecificCourse = async (req, res, next) => {

   let course = new Course({
      id: req.body.id,
      description: req.body.description,
      url: req.body.url,
      category: req.body.category.toLowerCase(),
      createdAt: Date.now(),
      description2: req.body.description2,
      description3: req.body.description3, 
      language: req.body.language  
  });

   await  Course.update(course, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "Course Updated",
         });
      }
   });
}


   module.exports = { addCourse, getCourses, getAllCourses, deleteSpecificCourse, updateSpecificCourse }