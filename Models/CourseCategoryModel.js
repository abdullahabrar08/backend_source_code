const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const CourseCategorySchema = new Schema({
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
       createdAt: {
           type: Number,
           required: true
       }
      
});

const CourseCategory = dynamoose.model("CourseCategory", CourseCategorySchema);

module.exports = CourseCategory 