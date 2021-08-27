const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const seriesSchema = new Schema({
       id: {
           type: String,
           required: true,
           index: {
            global: true,
          },
       },
       category:{
           type: String,
           required: true
       },
       number: {
           type: Number,
           required: true
       },
       url: {
           type: String,
           required:true
       },
       createdAt: {
           type: Number,
           required: true
       }
});

const Series = dynamoose.model("Series", seriesSchema);

module.exports = Series 