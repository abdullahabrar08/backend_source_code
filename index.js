const routes = require("./Routes/routes");
const express = require("express");
const dynamoose = require("dynamoose");
const app = express();
var cors = require("cors");
app.use(cors());


// Create new DynamoDB instance
const ddb = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": "AKIA4R6VRGUCELWQA6PX",
    "secretAccessKey": "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",
    "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb,(error) => {
    if (!error) {
      console.log("Dynamo DB connection established");
    } else {
      console.log("Dynamo DB connection failure");
    }
  });


//Make a router using express to call different api's
app.use(express.json());
app.use("/quiz/api", routes);

///Setting up port for express server to call api's 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express Server is running on port ${port}`);
  console.log("Quiz app server start")
});
