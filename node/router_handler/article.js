const DB = require("../db/index");
const getArticleTypeList = (req, res) => {
  const countSql = "select count(*) as count from article_type";
  const sql = "select * from article_type limit ? offset ?";
  const pageSize = Number(req.query.pageSize);
  const pages = Number(req.query.pages);

  DB.query(countSql, (err, result) => {
    if (err) return res.cc(err);
    const count = result[0].count;
    DB.query(
      sql,
      [
        pageSize,
        pageSize * (pages - 1),
      ],
      (err, result) => {
        if (err) return res.cc(err);
        if (result.length === 0) return res.cc("没有数据！");
        res.cc({
          status: 200,
          message: "获取文章类型列表成功！",
          data: { count, list: result },
        });
      }
    );
  });
};
const getAddArticleType = (req, res) => {
  const sql = "select * from article_type where type=? or name=?";
  DB.query(sql, [req.body.type, req.body.name], (err, result) => {
    if (err) return res.cc(err);
    if (result.length > 1) return res.cc("文章类型名称和类型已存在！");
    if (result.length === 1 && result[0]["name"] === req.body.name)
      return res.cc("文章类型名称已存在！");
    if (result.length === 1 && result[0]["type"] == req.body.type)
      return res.cc("文章类型已存在！");
    const sql2 = "insert into article_type set ?";
    DB.query(sql2, req.body, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("添加文章类型失败！");
      res.cc({ status: 200, message: "添加文章类型成功！" });
    });
  });
};
const getUpdateArticleType = (req, res) => {
  const sql2 = "update article_type set ? where id=?";
  DB.query(sql2, [req.body, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("修改文章类型失败！");
    res.cc({ status: 200, message: "修改文章类型成功！" });
  });
};
const getDeleteArticleType = (req, res) => {
  const sql = "delete from article_type where id=?";
  DB.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("删除文章类型失败！");
    res.cc({ status: 200, message: "删除文章类型成功！" });
  });
};
const getAddArticle = (req, res) => {
  const sql = "insert into article set ?";
  DB.query(sql, req.body, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("添加文章失败！");
    res.cc({ status: 200, message: "添加文章成功！" });
  });
};
module.exports = {
  getArticleTypeList,
  getAddArticleType,
  getUpdateArticleType,
  getDeleteArticleType,
  getAddArticle,
};
