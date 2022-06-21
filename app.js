
const express = require("express");
const dayjs = require("dayjs");
const app = express();
const bodyParser = require('body-parser')
const db = require("./src/tools/db.js");
app.use(bodyParser.json()); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ extended: true }));

/** start */
app.get("/", async (req, res) => {
  res.json({
    success: true,
    data: '服务已启动',
  });
});

 /** 查询 */
app.get("/word/query", async (req, res) => {
  console.log('🏳️‍🌈 <输出> /user/list')
  const {result} = await db.find('wordList')
  res.json({
    success: true,
    data:result
  });
});

 /** 添加 */
app.get("/word/add", async (req, res) => {
  const params = req.query;
  await db.insert('wordList',{createDate:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), ...params})
  res.json({
    success: true,
    data: [],
  });
});



app.listen(8100, () => {
  console.log(`Example app listening at http://localhost:8100`);
});
