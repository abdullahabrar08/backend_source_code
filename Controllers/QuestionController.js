const dynamoose = require("dynamoose");
const Question = require('../Models/QuestionModel');
const uuid = require("uuid");
const { options } = require("../Routes/routes");

const addQuestion = async (req, res, next) => {
    console.log(req.body)
   let question = new Question({
       id: uuid.v1(),
       category:  req.body.category.toLowerCase(),
       seriesNumber: req.body.series,
       url: req.body.url,
       title: req.body.question,
       option1: req.body.option1,
       option2: req.body.option2,
       option3: req.body.option3,
       option4: req.body.option4,
       option1Key: req.body.option1Key,
       option2Key: req.body.option2Key,
       option3Key: req.body.option3Key,
       option4Key: req.body.option4Key,
       questionType: req.body.questionType,
       description: req.body.description,
       createdAt: Date.now(),
       language: req.body.language 
   });
  await question
      .save()
      .then((response) =>{
         res.json({
            status: 'OK' ,
            code: 200,
            message : 'Question added'
        })
       })
       .catch((err) =>{
           console.log("error : ",err);
            res.json({
             status: 'Bad Request' ,
             code: 400,
             message : 'server side issue'
           })
       })
}

const getAllQuestions = async (req, res, next) => {
   
   await Question.scan().exec()
       .then((response) =>{
        if(response.count > 0){
            var temp = []
            for(var i = 0 ; i < response.count ; i++){
             var options = compressOptions(response[i])   
             delete response[i].option1
             delete response[i].option2
             delete response[i].option3
             delete response[i].option4
             delete response[i].option1Key
             delete response[i].option2Key
             delete response[i].option3Key
             delete response[i].option4Key
             response[i].options =  options   
             temp.push(response[i])
            }

            temp.sort((a,b) => {
                return  new Date(b.createdAt) - new Date(a.createdAt);
             })

             res.json({
                 status: 'OK' ,
                 code: 200,
                 message : temp.reverse()
             })
         }else {
             res.json({
               status: 'OK' ,
               code: 201,
               message : []
             })
         }
        })
        .catch((err) =>{
            console.log("error : ",err);
             res.json({
              status: 'Bad Request' ,
              code: 400,
              message : 'server side issue'
            })
        })
 }

const getQuestions = async (req, res, next) => {
    Question.scan(new dynamoose.Condition().where("category").eq(req.body.category.toLowerCase()).and().where("seriesNumber").eq(req.body.seriesNumber))
    .exec()
    .then((response) =>{
        if(response.count > 0){
           var temp = []
           for(var i = 0 ; i < response.count ; i++){
            var options = compressOptions(response[i])   
            delete response[i].option1
            delete response[i].option2
            delete response[i].option3
            delete response[i].option4
            delete response[i].option1Key
            delete response[i].option2Key
            delete response[i].option3Key
            delete response[i].option4Key
            response[i].options =  options   
            temp.push(response[i])
           }

           temp.sort((a,b) => {
            return  new Date(b.createdAt) - new Date(a.createdAt);
         })

            res.json({
                status: 'OK' ,
                code: 200,
                message : temp.reverse()
            })
        }else {
            res.json({
              status: 'OK' ,
              code: 201,
              message : "No Question Found"
            })
        }
    })
    .catch((err) =>{
         console.log("server error",err);
         res.json({
          status: 'Bad Request' ,
          code: 400,
          message : 'server side issue'
        })
    })
 }

 function compressOptions(data){
    var options = []   
    for(var j = 1 ; j <= 4 ; j++){
        switch(j){
            case 1: 
                var object = {
                    label: data.option1,
                    value: data.option1Key == true ? 1 : 0,
                    key: data.option1Key == true ? 1 : 0
                }
                options.push(object)
                break;
            case 2: 
                var object = {
                    label: data.option2,
                    value: data.option2Key == true ? 1 : 0,
                    key: data.option2Key == true ? 1 : 0
                }
                options.push(object)
                break;
            case 3: 
                if(data.option3 != '') {
                    var object = {
                        label: data.option3,
                        value: data.option3Key == true ? 1 : 0,
                        key: data.option3Key == true ? 1 : 0
                    }
                    options.push(object)
                }
                break;
            case 4: 
                if(data.option4 != '') {
                    var object = {
                        label: data.option4,
                        value: data.option4Key == true ? 1 : 0,
                        key: data.option4Key == true ? 1 : 0
                    }
                    options.push(object)
                }
                break;   
        }
    }
 
   return options
 }

 const deleteSpecificQuestion = async (req, res, next) => {
    await Question.delete({id: req.body.id}, (error) => {
       if (error) {
          res.json({
             status: 400,
             message: "Bad request",
          });
       } else {
          res.json({
             status: 200,
             message: "Series deleted",
          });
       }
    });
 }

 const updateSpecificQuestion = async (req, res, next) => {

    let questionObject = new Question({
        id: req.body.id,
        category:  req.body.category.toLowerCase(),
        seriesNumber: req.body.series,
        url: req.body.url,
        title: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        option1Key: req.body.option1Key,
        option2Key: req.body.option2Key,
        option3Key: req.body.option3Key,
        option4Key: req.body.option4Key,
        questionType: req.body.questionType,
        description: req.body.description
    });
    await  Question.update(questionObject, (error) => {
        if (error) {
            console.log(error)
           res.json({
              code: 400,
              message: "Bad request",
           });
        } else {
           res.json({
              code: 200,
              message: "Question Updated",
           });
        }
     });
 }

   module.exports = { addQuestion, getQuestions, getAllQuestions, deleteSpecificQuestion, updateSpecificQuestion }