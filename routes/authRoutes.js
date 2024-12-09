const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const{register,login,logout, changePassword, forgetPassword} = require("../controllers/authController");
// const auth = require("../middlewares/authMiddleware");

router.post("/register", register);  // User registration route
router.post("/login", login);        // User login route
router.post("/logout", logout);      // User logout route (optional with JWT)
router.put("/changepassword",auth,changePassword);
router.post("/forgetpassword",forgetPassword);

module.exports = router;