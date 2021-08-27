const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const categorySchema = new Schema({
       id: {
           type: String,
           required: true,
           index: {
            global: true,
          },
       },
       title:{
           type: String,
           required: true
       },
       description: {
            type: String,
            required: true
       },
       createdAt: {
           type: Number,
           required: true
       }
});

const Category = dynamoose.model("Category", categorySchema);

module.exports = Category 