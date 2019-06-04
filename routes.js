const express = require('express');
const CourseRoutes = require('./Course/Course.Routes');
const SubjectRoutes = require('./Subject/Subject.Routes');
const Routes = express.Router();

Routes.use('/course/',CourseRoutes);
Routes.use('/subject/',SubjectRoutes);

module.exports = Routes;