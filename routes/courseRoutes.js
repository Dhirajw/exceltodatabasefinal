const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {CreateCourse ,EnrollCourse,UpdateCourse,listCourses,getCourseDetails,deletecourse,restorecourse} = require("../controllers/courseController");

router.post("/coursecreate", authMiddleware,CreateCourse); // Create a course (instructor)
router.post("/courseenroll",authMiddleware,EnrollCourse);
router.post("/updatecourse/:id",authMiddleware,UpdateCourse);
router.get("/", authMiddleware, listCourses);  
router.get('/:id', authMiddleware, getCourseDetails); 
router.delete("/:id",authMiddleware,deletecourse);
router.post("/restore/:id",authMiddleware,restorecourse);


module.exports = router;