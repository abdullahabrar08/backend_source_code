const dynamoose = require('dynamoose');
const { model } = require('mongoose');
const Schema = dynamoose.Schema;

const CourseSchema = new Schema({
       id: {
           type: String,
           required: true,
           index: {
            global: true,
          },
       },
       description:{
           type: String,
           required: true
       },
       url: {
           type: String,
           required: true
       },
       category: {
           type: String,
           required: true
       },
       createdAt: {
           type: Number,
           required: true
       },
       description2:{
        type: String,
        },
        description3:{
            type: String,
        },
        language: {
            type: Boolean
        }

});

const Course = dynamoose.model("Course", CourseSchema);

module.exports = Course 