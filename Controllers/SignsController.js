const dynamoose = require("dynamoose");
const Sign = require('../Models/SignsModel');
const uuid = require("uuid");

const addSign = async (req, res, next) => {
   console.log(req.body);
   let sign = new Sign({
       id: uuid.v1(),
       title:  req.body.SignName,
       signType:  req.body.SignType,
       description: req.body.description,
       url:  req.body.imageUrl,
       category: req.body.category,
       createdAt: Date.now(),
       description2: req.body.description2,
       description3: req.body.description3, 
       language: req.body.language  
   });

  await sign
      .save()
      .then((response) =>{
         res.json({
            status: 'OK' ,
            code: 200,
            message : 'Sign added'
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

const deleteSign = async (req, res, next) => {
   await Sign.delete({id: req.body.id}, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "sign deleted",
         });
      }
   });
}

const getSigns = async (req,res, next) => {
   await Sign
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
                message: "sign exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no sign exist",
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

const getAllSigns = async (req,res, next) => {
   await Sign
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
                message: "sign exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no sign exist",
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

const updateSpecificSign = async (req, res, next) => {

   let sign = new Sign({
      id: uuid.v1(),
      title:  req.body.SignName,
      signType:  req.body.SignType,
      description: req.body.description,
      url:  req.body.imageUrl,
      category: req.body.category,
      description2: req.body.description2,
      description3: req.body.description3, 
      language: req.body.language 
  });

   await  Sign.update(sign, (error) => {
      if (error) {
         res.json({
            status: 400,
            message: "Bad request",
         });
      } else {
         res.json({
            status: 200,
            message: "Sign Updated",
         });
      }
   });
}
  

   module.exports = { addSign, deleteSign, getSigns, getAllSigns, updateSpecificSign }