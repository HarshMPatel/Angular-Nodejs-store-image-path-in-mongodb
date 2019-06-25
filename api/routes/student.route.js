const express = require('express');
const app = express();
const studentRoutes = express.Router();

// Require Student model in our routes module
let Student = require('../models/Student');

// Defined store route
studentRoutes.route('/add').post(function (req, res) {
  console.log("Studentadd");
  let student = new Student(req.body);
  student.save()
    .then(student => {
      res.status(200).json({'student': 'student in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
studentRoutes.route('/').get(function (req, res) {
  Student.find(function (err, students){
  if(err){
    console.log(err);
  }
  else {
    res.json(students);
  }
});
});

// Defined edit route
studentRoutes.route('/edit/:id').get(function (req, res) {
let id = req.params.id;
Student.findById(id, function (err, student){
    res.json(student);
});
});

//  Defined update route
studentRoutes.route('/update/:id').post(function (req, res) {
  Student.findById(req.params.id, function(err, next, student) {
  if (!student)
    return next(new Error('Could not load Document'));
  else {
    student.person_name = req.body.person_name;
    student.business_name = req.body.business_name;
    student.business_gst_number = req.body.business_gst_number;

    student.save().then(student => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});

// Defined delete | remove | destroy route
studentRoutes.route('/delete/:id').get(function (req, res) {
  Student.findByIdAndRemove({_id: req.params.id}, function(err, student){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

studentRoutes.route('/email/:email').get(function (req, res) {
  let email = req.params.email;
  Student.find({s_email: email}, function (err, student){
      res.json(student);
  });
});

module.exports = studentRoutes;