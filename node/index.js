const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/user");
const infoRouter = require("./router/user_info");
const articleRouter = require("./router/article");
const { expressjwt } = require("express-jwt");
const Config = require("./config/config");
// 导入验证规则包
const joi = require("joi");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.cc = function (err, status) {
    res.send({
      data: err instanceof Error ? err.message : err,
    });
  };
  next();
});
app.use(
  expressjwt({ secret: Config.scretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
); //unless 配置那些接口不需要token
app.use("/api", router);
app.use("/my", infoRouter);
app.use("/article", articleRouter);
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError")
    return res.cc({ status: err.status, message: err.message });
  // 未知错误
  res.cc(err);
});
// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     return res.send({
//       message: "无效token",
//     });
//   }
//   res.send({
//     message: "未知错误",
//   });
// });

app.listen(3000, () => {
  console.log("正在监听3000端口");
});
