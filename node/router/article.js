const express = require("express");
const router = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象

const article_handler = require("../router_handler/article");
router.get("/getArticleTypeList", article_handler.getArticleTypeList);
router.post("/getAddArticleType", article_handler.getAddArticleType);
router.post("/getUpdateArticleType", article_handler.getUpdateArticleType);
router.post("/getDeleteArticleType", article_handler.getDeleteArticleType);
router.post("/getAddArticle", article_handler.getAddArticle);
module.exports = router;
