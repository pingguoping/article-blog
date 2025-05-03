const express = require("express");
const router = express.Router();
const router_handler = require("../router_handler/user_info");
const expressJoi = require("@escook/express-joi");
const { updatePasswordSchema } = require("../schema/user");
router.get("/userInfo", router_handler.getUserInfo);
router.post("/update/userInfo", router_handler.upDateUserInfo);
router.post(
  "/update/password",
  expressJoi(updatePasswordSchema),
  router_handler.updatePassword
);
module.exports = router;
