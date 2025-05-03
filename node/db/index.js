const mysql = require("mysql");

let db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "my_db_01",
});
//测试是否连接数据库成功
// db.query('select 1',(err,result)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(result)
// })

module.exports = db;
