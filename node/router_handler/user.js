const DB = require("../db/index");
const Bcrypt = require("bcrypt");
const Config = require("../config/config");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const data = req.body;
  if (!data.username || !data.password) return res.cc("账号或者密码不能为空");
  const sql = "select * from users where username=?";
  DB.query(sql, data.username, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('"用户名不存在"');
    const comnpareResult = Bcrypt.compareSync(
      data.password,
      result[0]["password"]
    );
    if (!comnpareResult) return res.cc("登录失败");

    const token ='Bearer '+jwt.sign({...result[0]}, Config.scretKey, {
      expiresIn: Config.expiresIn,
    });
    res.cc({status:200,token:token,userinfo:result[0]});
  });
};
const Register = (req, res) => {
  const data = req.body;
  if (!data.username || !data.password) return res.cc("账号或者密码不能为空");
  data.password = Bcrypt.hashSync(data.password, 10);
  const sql = "select * from users where username=?";
  DB.query(sql, data.username, (err, result) => {
    if (err) return res.cc(err);
    if (result.length > 0) return res.cc('"用户名已存在"');
    const sql2 = "insert into users set ?";
    DB.query(
      sql2,
      { username: data.username, password: data.password },
      (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc("数据插入失败");
        res.cc("数据插入成功");
      }
    );
  });
};
module.exports = {
  login,
  Register,
};
