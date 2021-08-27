const dynamoose = require("dynamoose");
const Admin = require("../Models/AdminModel");

/// Rest service to Add new Admin user.....you can add new admin user using POSTMAN

const addAdmin = (req, res, next) => {
  let user = new Admin({
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  });

  user
    .save()
    .then((response) => {
      console.log("response", response);
      res.json({
        message: "true",
      });
    })
    .catch((err) => {
      console.log("Dynamoose error : ", err);
      res.json({
        message: "false",
      });
    });
};

////  Rest Service to find admin
const findUser = (req, res, next) => {
  Admin.scan(new dynamoose.Condition().where("email").eq(req.body.email.toLowerCase()).and().where("password").eq(req.body.password))
    .exec()
    .then((response) =>{
        if(response.count > 0){
            res.json({
                status: 'OK' ,
                code: 200,
                message : 'user available'
            })
        }else {
            res.json({
              status: 'OK' ,
              code: 400,
              message : 'user not found'
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
};

module.exports = {
  addAdmin,
  findUser,
};
