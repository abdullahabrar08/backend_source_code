const dynamoose = require("dynamoose");
const Series = require('../Models/SeriesModel');
const uuid = require("uuid");

const addSeries = async (req, res, next) => {
   let series = new Series({
       id: uuid.v1(),
       category:  req.body.category.toLowerCase(),
       number: req.body.number,
       url: req.body.url,
       createdAt: Date.now() 
   });

  await series
      .save()
      .then((response) =>{
         res.json({
            status: 'OK' ,
            code: 200,
            message : 'Series added'
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

const getSpecificSeriesCount = async (req, res, next) => {
    Series.scan(new dynamoose.Condition().where("category").eq(req.body.category.toLowerCase()))
    .exec()
    .then((response) =>{
        if(response.count > 0){
            res.json({
                status: 'OK' ,
                code: 200,
                message : response.count
            })
        }else {
            res.json({
              status: 'OK' ,
              code: 201,
              message : "No series Found"
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

const getCategorySpecificSeriesList = async (req, res, next) => {
   Series.scan(new dynamoose.Condition().where("category").eq(req.body.category.toLowerCase()))
   .exec()
   .then((response) =>{
       if(response.count > 0){
          var temp = []
          for(var i = 0 ; i < response.count ; i++){
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
             message : "No series Found"
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

const getSeries = async (req,res, next) => {
   await Series
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
                message: "Series exist",
                feed: feed.reverse()
             })
           } else{
            res.json({
               status: 201,
               message: "no Series exist",
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

const deleteSpecificSeries = async (req, res, next) => {
    await Series.delete({id: req.body.id}, (error) => {
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

 const updateSpecificSeries = async (req, res, next) => {

    let UpdatedSeriesObject = new Series({
        id: req.body.id,
        category:  req.body.category.toLowerCase(),
        number: req.body.number,
        url: req.body.url
    }); 

    await  Series.update(UpdatedSeriesObject, (error) => {
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


  

   module.exports = { addSeries, getSeries, getSpecificSeriesCount, getCategorySpecificSeriesList, deleteSpecificSeries, updateSpecificSeries }