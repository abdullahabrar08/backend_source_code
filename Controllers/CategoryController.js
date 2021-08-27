const dynamoose = require("dynamoose");
const Category = require('../Models/CategoryModel');
const Series = require('../Models/SeriesModel');
const Question = require('../Models/QuestionModel');
const uuid = require("uuid");

const addCategory = async (req, res, next) => {
   let category = new Category({
       id: uuid.v1(),
       title:  req.body.categoryTitle.toLowerCase(),
       description: req.body.description,
       createdAt: Date.now() 
   });

  let findCategory = await Category.scan(new dynamoose.Condition().where("title").eq(req.body.categoryTitle.toLowerCase())).exec()
   if(findCategory.count == 0){
      await category
      .save()
      .then((response) =>{
         res.json({
            status: 'OK' ,
            code: 200,
            message : 'Category added'
        })
       })
       .catch((err) =>{
            res.json({
             status: 'Bad Request' ,
             code: 400,
             message : 'server side issue'
           })
       })
   } else {
      res.json({
         status: 'Bad Request' ,
         code: 201,
         message : 'Category Already Exist'
       })
   }
}

const getCategories = async (req,res, next) => {
   await Category
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
                message: "categories exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no Category exist",
               feed: feed
            })
           }
         }).catch((err) =>{
            console.log(err)
            res.json({
               status: 400,
               message: "server failure",
            })
         });
}

const deleteCategory = async (req, res, next) => {
   await Category.delete({id: req.body.id}, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "Category deleted",
         });
      }
   });
}

const UpdateCategories = async (req,res, next) => {

   var previousCategoryName = req.body.previousCategory ;

   let UpdatedCategoryObject = new Category({
      id: req.body.id,
      title:  req.body.categoryTitle.toLowerCase(),
      description: req.body.description
  });

   await Category
        .scan()
        .exec().then((response) =>{
           let feed = []
           if(response.count > 0){
              for(var i = 0 ; i < response.count ; i++){
                 if(req.body.id != response[i].id) {
                  feed.push(response[i]);
                 }
              }
              if(feed.length > 0) {
               for(var i = 0 ; i < feed.length ; i++){
                  if(feed[i].title == req.body.categoryTitle) {
                     res.json({
                        status: 201,
                        message: "Category Already exist",
                     })
                     break;
                  } else {
                     // update directly
                     var seriesResponse;
                           (async() => {
                               await getSeries( previousCategoryName, req.body.categoryTitle, UpdatedCategoryObject, res)
                            })();
                              
                     break;
                  }
               }
              } else {
               // update directly
               var seriesResponse;
               (async() => {
                    await getSeries(previousCategoryName, req.body.categoryTitle, UpdatedCategoryObject, res)
                })();
                  
            }
           } else{
            res.json({
               status: 202,
               message: "no Category exist",
            })
           }
         }).catch((err) =>{
            res.json({
               status: 400,
               message: "server failure",
            })
         });
}

async function  getSeries (previousCategoryName, category, UpdatedCategoryObject, res) {
   await Series
        .scan()
        .exec().then((response) =>{
           let feed = []
           if(response.count > 0){
              for(var i = 0 ; i < response.count ; i++){
                 if(response[i].category ==  previousCategoryName) {
                  feed.push(response[i]);
                 }
              }
              if(feed.length > 0) {
                 console.log("feed length L ", feed)
               for(var i = 0 ; i < feed.length ; i++) {
                   (async() => {
                     await updateSpecificSeries(feed[i].id, category, UpdatedCategoryObject, res)
                  })();
               }
               console.log('updateCategory Called : ');
               // updateCategory(UpdatedCategoryObject, res)
               (async() => {
                  await getQuestions(previousCategoryName, category, UpdatedCategoryObject, res)
              })();
                
              } else {
               // updateCategory(UpdatedCategoryObject, res)
               (async() => {
                  await getQuestions(previousCategoryName, category, UpdatedCategoryObject, res)
              })();
                
              }
           } else{
            // updateCategory(UpdatedCategoryObject, res)
            (async() => {
               await getQuestions(previousCategoryName, category, UpdatedCategoryObject, res)
           })();
             
           }
         }).catch((err) =>{
            return false
         });
}


async function  getQuestions (previousCategoryName, category, UpdatedCategoryObject, res) {
   await Question
        .scan()
        .exec().then((response) =>{
           let feed = []
           if(response.count > 0){
              for(var i = 0 ; i < response.count ; i++){
                 if(response[i].category ==  previousCategoryName) {
                  feed.push(response[i]);
                 }
              }
              if(feed.length > 0) {
                 console.log("feed length L ", feed)
               for(var i = 0 ; i < feed.length ; i++) {
                   (async() => {
                     await updateSpecificQuestion(feed[i].id, category, UpdatedCategoryObject, res)
                  })();
               }
               console.log('updateCategory Called : ');
               updateCategory(UpdatedCategoryObject, res)
              } else {
               updateCategory(UpdatedCategoryObject, res)
              }
           } else{
            updateCategory(UpdatedCategoryObject, res)
           }
         }).catch((err) =>{
            return false
         });
}


async function updateSpecificSeries (id, category, res)  {

   let UpdatedSeriesObject = new Series({
       id: id,
       category:  category
   }); 

   await  Series.update(UpdatedSeriesObject, (error) => {
      if (error) {
         console.log('Error', error)
      } else {
         console.log("updated") 
      }
   });
}


async function updateSpecificQuestion (id, category, res)  {

   let UpdatedQuestionObject = new Question({
       id: id,
       category:  category
   }); 

   await  Question.update(UpdatedQuestionObject, (error) => {
      if (error) {
         console.log('Error', error)
      } else {
         console.log("updated") 
      }
   });
}


async function updateCategory( UpdatedCategoryObject, res) {
   Category.update(UpdatedCategoryObject)
   .then((response) => {
      res.json({
         status: 200,
         message: "Category Updated",
      })
   })
   .catch((err) => {
      res.json({
         status: 203,
         message: "Something went wrong",
      })
   })
}



   module.exports = { addCategory, getCategories, deleteCategory, UpdateCategories }