const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {createAssignment,submitAssignment,gradeAssignment} = require("../controllers/assignmentController");

router.post("/createassignment",authMiddleware,createAssignment);
router.post("/submitassignment",authMiddleware,submitAssignment);
router.put("/gradeassignment/:submissionId",authMiddleware,gradeAssignment);

module.exports = router;