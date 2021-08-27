const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      index: {
        global: true,
        rangeKey: "createdAt",
      },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = dynamoose.model("AdminUsers", AdminSchema);

module.exports = Admin;
