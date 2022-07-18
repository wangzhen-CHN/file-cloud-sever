//导入fs文件系统
const fs = require("fs");
const path = require("path");

const readDir = (entry) => {
  const dirInfo = fs.readdirSync(entry);
  const files = [];
  dirInfo.forEach((item) => {
    const location = path.join(entry, item);
    const info = fs.statSync(location);
    const params = {
      name: item,
      size: info.size,
      createDate: info.birthtime,
    };
    if (info.isDirectory()) {
      params.type = "directory";
    } else {
      params.type = "file";
    }
    files.push(params)
  });
  return files;
};
const readdirSync = { readDir };

module.exports = readdirSync;
