const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Student
let Student = new Schema({
  s_name: {
    type: String
  },
  s_email: {
    type: String,
    unique: true
  },
  s_phone: {
    type: Number
  },
  s_department: {
    type: String
  },
  s_profile: {
    type: String
  },
  s_gender: {
    type: String
  },
  s_hobbie: {
    type: Array
  }
},{
    collection: 'student'
});

module.exports = mongoose.model('Student', Student);