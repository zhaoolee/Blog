const fs = require("fs");
const multer = require("multer");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

let server = express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

let upload = multer({ dest: __dirname+'/uploads/' });

// 测试数据
const people_info_data_base = [
  {name: "zhaoolee1", age: 1}, 
  {name: "zhaoolee2", age: 2}, 
  {name: "zhaoolee3", age: 3}, 
  {name: "zhaoolee4", age: 4}, 
  {name: "zhaoolee5", age: 5}, 
  {name: "zhaoolee6", age: 6}, 
];

// 处理post请求
server.post("/get_age", function(req, res){
  people_info_data_base.map((people_info_value, people_info_index)=>{
    if(people_info_value["name"] === req.body.name){
      const result = {
        "age": people_info_value["age"],
        "method": "post"
      }
      res.send(result);
    }
  })
})

// 处理get请求
server.get("/get_age", function(req, res){
  people_info_data_base.map((people_info_value, people_info_index)=>{
    if(people_info_value["name"] === req.query.name){
      const result = {
        "age": people_info_value["age"],
        "method": "get"
      }
      res.send(result)
    }
  })
})

// 处理提交文件的post请求
server.post('/upload_file', upload.single('file'), function (req, res, next) {
  console.log("file信息", req.file);
  fs.rename(req.file.path, req.file.path+"."+req.file.mimetype.split("/").pop(), ()=>{
    res.send({status: 1000})
  })
})

// 监听服务
server.listen(8080, function(){
  console.log("服务端口 http://localhost:8080/")
});