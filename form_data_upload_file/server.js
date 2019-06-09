const express = require("express");
const multer = require("multer");
const expressStatic = require("express-static");
const fs = require("fs");

let server = express();
let upload = multer({ dest: __dirname+'/uploads/' })
// 处理提交文件的post请求
server.post('/upload_file', upload.single('file'), function (req, res, next) {
  console.log("file信息", req.file);
  fs.rename(req.file.path, req.file.path+"."+req.file.mimetype.split("/").pop(), ()=>{
    res.send({status: 1000})
  })
})

// 处理静态目录
server.use(expressStatic(__dirname+"/www"))
// 监听服务
server.listen(8080, function(){
  console.log("请使用浏览器访问 http://localhost:8080/")
});