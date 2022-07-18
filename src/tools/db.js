/**
 * 数据库操作
 */
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

async function _connect() {
  return await new Promise((resolve) => {
    mongoClient.connect(
      "mongodb://124.223.108.239:27017",
      function (err, server) {
        const db = server.db("fileCloud")
        resolve({db,server}); //库名
      }
    );
  });
}
/**
 * @name 条件查找记录
 * @param obj 参数
 */
const find = async function (collectName,params={}){
  const {db,server} = await _connect();
  return await new Promise((resolve) => {
    db.collection(collectName)
      .find(params.whereObj||{})
      .sort(params.sortObj||{})
      .limit(params.limitNum|| 0)
      .skip(params.skipNum|| 0)
      .toArray((err, result) => {
        resolve({ err, result });
        server.close();
      });
  });
};

//根据id查找一条记录
const findById = async (collectName,id) => {
  const {db,server} = await _connect();
  return await new Promise((resolve) => {
    db.collection(collectName).findOne(
      { _id: mongodb.ObjectId(id) },
      (err, result) => {
        resolve({ err, result });
        server.close();
      }
    );
  });
};

//插入一条记录
const insert = async (collectName,obj) => {
  const {db,server}  = await _connect();
  return await new Promise((resolve) => {
    db.collection(collectName).insertOne(obj, (err, result) => {
      resolve({ err, result });
      server.close();
    });
  });
};

//通过指定的id删除单条记录
const deleteById = async (collectName,id) => {
  const {db,server} = await _connect();
  return await new Promise((resolve) => {
    db.collection(collectName).deleteOne(
      { _id: mongodb.ObjectId(id) },
      (err, result) => {
        resolve({ err, result });
        server.close();
      }
    );
  });
};

/**
 * @name 根据ID修改记录
 * @param {string} id
 * @param {obj} obj
 */
const updateById = async (collectName,id, obj) => {
  const {db,server} = await _connect();
  return await new Promise((resolve) => {
    db.collection(collectName).updateOne(
      { _id: mongodb.ObjectId(id) },
      obj,
      (err, result) => {
        resolve({ err, result });
        server.close();
      }
    );
  });
};
const db= { find,findById,insert,deleteById,updateById };

module.exports = db
