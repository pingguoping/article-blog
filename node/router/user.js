const express = require("express");
const router = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象
const { accountSchema } = require("../schema/user");
const router_handler = require("../router_handler/user");
router.post("/login", expressJoi(accountSchema), router_handler.login);
router.post("/register", expressJoi(accountSchema),router_handler.Register);
module.exports = router;
