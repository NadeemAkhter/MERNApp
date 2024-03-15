import { Router } from "express";
import * as controller from "../controllers/appController.js";
import { Auth, localVariables } from "../middleware/auth.js";

const router = Router();

//POST Methods
router.route("/register").post(controller.register);
// router.route("/registerMail").post();
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

//GET Methods
router.route("/user/:userName").get(controller.getUser);
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

//PUT methods
router.route("/updateUser").put(Auth, controller.updateUser);
router.route("/resetPassword").put(controller.resetPassword);

export default router;
