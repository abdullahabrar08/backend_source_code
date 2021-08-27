const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const SignsCategorySchema = new Schema({
       id: {
           type: String,
           required: true,
           index: {
            global: true,
          },
       },
        title: {
            type: String,
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

const SignsCategory = dynamoose.model("SignsCategory", SignsCategorySchema);

module.exports = SignsCategory 