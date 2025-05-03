// 导入验证规则包
const joi = require("joi");
// 用户名的验证规则
const username = joi.string().min(3).max(12).required();
// 密码的验证规则
const password = joi.string().required();

// 注册和登录表单的验证规则对象
exports.accountSchema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
};
exports.updatePasswordSchema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};
