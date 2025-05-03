const DB = require("../db/index");
const Bcrypt = require("bcrypt");
const getUserInfo = (req, res) => {
  const sql = "select * from users where id=?";
  DB.query(sql, req.auth.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("获取用户信息失败");
    res.send({ status: 200, data: result[0] });
  });
};
const upDateUserInfo = (req, res) => {
  const sql = "update users set ? where id=?";
  DB.query(sql, [req.body, req.auth.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("更新用户信息失败");
    res.cc({ status: 200, message: "更新用户信息成功" });
  });
};
const updatePassword = (req, res) => {
  const sql = "update users set password=? where id=?";
  req.body.newPwd = Bcrypt.hashSync(req.body.newPwd , 10);
  DB.query(sql, [req.body.newPwd, req.auth.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("更新密码失败");
    res.cc({ status: 200, message: "更新密码成功" });
  });
};
module.exports = {
  getUserInfo,
  upDateUserInfo,
  updatePassword,
};
