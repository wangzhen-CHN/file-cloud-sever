
const express = require("express");
const dayjs = require("dayjs");
const app = express();
const bodyParser = require('body-parser')
const db = require("./src/tools/db.js");
const readdirSync = require("./src/tools/getFiles");
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
  const { result } = await db.find('wordList')
  res.json({
    success: true,
    data: result
  });
});

/** 添加 */
app.get("/word/add", async (req, res) => {
  const params = req.query;
  await db.insert('wordList', { createDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), ...params })
  res.json({
    success: true,
    data: [],
  });
});

/** 删除 */
app.get("/word/delete", async (req, res) => {
  const params = req.query;
  console.log('🏳️‍🌈 <输出> params', params)
  await db.deleteById('wordList', params.id)
  res.json({
    success: true,
    data: [],
  });
});


/** 查询 */
app.get("/file/query", async (req, res) => {
  const files = readdirSync.readDir('/Users/wz/code/file-cloud-server')
  files.sort(a => { return a.type === 'file' ? 1 : -1 })//升序
  res.json({
    success: true,
    data: files
  });
});

/** 添加 */
app.get("/file/add", async (req, res) => {
  const params = req.query;
  await db.insert('wordList', { createDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), ...params })
  res.json({
    success: true,
    data: [],
  });
});

/** 删除 */
app.get("/file/delete", async (req, res) => {
  const params = req.query;
  await db.deleteById('wordList', params.id)
  res.json({
    success: true,
    data: [],
  });
});


app.listen(8100, () => {
  console.log(`Example app listening at http://localhost:8100`);
});
