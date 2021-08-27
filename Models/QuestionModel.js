const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const questionSchema = new Schema({
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
       seriesNumber: {
           type: String,
           required: true
       },
       url: {
           type: String,
           required:true
       },
       title: {
           type: String,
           required: true
       },
       option1: {
           type: String,
           required: true
       },
       option2: {
           type: String,
           required: true
       },
       option3: {
        type: String
        },
        option4: {
            type: String
        },
        option1Key: {
            type: Boolean,
        },
        option2Key: {
            type: Boolean,
        },
        option3Key: {
            type: Boolean,
        },
        option4Key: {
            type: Boolean,
        },
        questionType: {
            type: String,
            required:  true
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: Number,
            required: true
        },
        language: {
            type: Boolean
        }
    
});

const Question = dynamoose.model("Question", questionSchema);

module.exports = Question 