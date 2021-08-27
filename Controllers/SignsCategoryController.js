const dynamoose = require("dynamoose");
const SignsCategory = require('../Models/SignsCategoryModel');
const Series = require('../Models/SeriesModel');
const uuid = require("uuid");

const addSignsCategory = async (req, res, next) => {
   let category = new SignsCategory({
       id: uuid.v1(),
       title:  req.body.title.toLowerCase(),
       url: req.body.url,
       createdAt: Date.now() 
   });

  let findCategory = await SignsCategory.scan(new dynamoose.Condition().where("title").eq(req.body.title.toLowerCase())).exec()
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

const getSignCategories = async (req,res, next) => {
   await SignsCategory
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
            res.json({
               status: 400,
               message: "server failure",
            })
         });
}

const deleteSpecificSignCategory = async (req, res, next) => {
   await SignsCategory.delete({id: req.body.id}, (error) => {
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

const updateSpecificSignCategory = async (req, res, next) => {

   let categoryObject = new SignsCategory({
      id: req.body.id,
      title:  req.body.title.toLowerCase(),
      url: req.body.url
  });

   await  SignsCategory.update(categoryObject, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "Category Updated",
         });
      }
   });
}


   module.exports = { addSignsCategory, getSignCategories, deleteSpecificSignCategory, updateSpecificSignCategory }