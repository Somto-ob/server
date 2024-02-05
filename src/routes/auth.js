const { Router } = require("express");
const pool = require("../db");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  credit,
  updateDataBalance,
} = require("../controllers/auth");
// const { verifyEmail } = require("../controllers/userController");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const router = Router();

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);
//router.post("/verify-email", verifyEmail);
//router.put("/credit", userAuth, credit);

module.exports = router;
