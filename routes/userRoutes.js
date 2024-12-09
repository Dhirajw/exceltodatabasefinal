const express = require("express");
const router = express.Router();
const  authMiddleware = require("../middlewares/authMiddleware");
const {updateProfiles} = require("../controllers/userController");

router.put("/profiles", authMiddleware, updateProfiles); // Only accessible when logged in

module.exports = router;