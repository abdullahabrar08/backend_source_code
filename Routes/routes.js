const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/AdminController");
const SignsController = require("../Controllers/SignsController");
const UploadImages = require("../Middleware/uploadImages");
const CategoryController = require("../Controllers/CategoryController");
const SeriesController = require("../Controllers/SeriesController");
const QuestionController = require("../Controllers/QuestionController");
const CourseController = require("../Controllers/CourseController");
const CourseCategoryController = require("../Controllers/CourseCategoryController");
const SignsCategoryController = require("../Controllers/SignsCategoryController");

// api's to manage admin 

router.post("/addAdmin", AdminController.addAdmin);
router.post("/findAdmin", AdminController.findUser);


// api's to manage sign's

router.post("/addSignCategory", SignsCategoryController.addSignsCategory);
router.get("/getSignCategories", SignsCategoryController.getSignCategories);
router.post("/deleteSpecificSignCategory", SignsCategoryController.deleteSpecificSignCategory);
router.post("/updateSpecificSignCategory", SignsCategoryController.updateSpecificSignCategory);
router.post("/addSign", SignsController.addSign);
router.post("/getSigns", SignsController.getSigns);
router.post("/deleteSign", SignsController.deleteSign);
router.get("/getAllSigns", SignsController.getAllSigns);
router.post("/updateSpecificSign", SignsController.updateSpecificSign);

// api's to manage quiz categories

router.post("/addQuizCategory", CategoryController.addCategory);
router.get("/getCategories", CategoryController.getCategories);
router.post("/deleteCategory", CategoryController.deleteCategory);
router.post("/updateCategory", CategoryController.UpdateCategories);


// api's to manage series

router.post("/addSeries", SeriesController.addSeries);
router.get("/getAllSeries", SeriesController.getSeries);
router.post("/getSeriesCount", SeriesController.getSpecificSeriesCount);
router.post("/getSeriesOfSpecificCategory", SeriesController.getCategorySpecificSeriesList);
router.post("/deleteSpecificSeries", SeriesController.deleteSpecificSeries);
router.post("/updateSpecificSeries", SeriesController.updateSpecificSeries);


// api's to manage questions

router.post("/addQuestion", QuestionController.addQuestion);
router.post("/getQuestions", QuestionController.getQuestions);
router.get("/getAllQuestions", QuestionController.getAllQuestions);
router.post("/deleteSpecificQuestion", QuestionController.deleteSpecificQuestion);
router.post("/updateSpecificQuestion", QuestionController.updateSpecificQuestion);

// api's to manage courses

router.post("/addCourseCategory", CourseCategoryController.addCourseCategory);
router.get("/getCourseCategories", CourseCategoryController.getCourseCategories);
router.post("/deleteSpecificCourseCategory", CourseCategoryController.deleteSpecificCourseCategory);
router.post("/updateSpecificCourseCategory", CourseCategoryController.updateSpecificCourseCategory);
router.post("/addCourse", CourseController.addCourse);
router.post("/getCourse", CourseController.getCourses);
router.get("/getAllCourses", CourseController.getAllCourses);
router.post("/deleteSpecificCourse", CourseController.deleteSpecificCourse);
router.post("/updateSpecificCourse", CourseController.updateSpecificCourse);

// api to upload image

router.post("/uploadImage", UploadImages.uploadImage);

module.exports = router;
