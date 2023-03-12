import express from "express";
const router = express.Router();

// import controller
import { signup, login, logout } from "../controllers/userController.js";
// import userMiddlewares
import { isLoggedIn, customRole } from "../middlewares/userMiddlewares.js";

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
