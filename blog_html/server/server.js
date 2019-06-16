const express = require("express");
const superagent = require('superagent');
const bodyParser = require('body-parser')

const fs = require("fs");

const cors = require("cors");
let server = express();


server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
server.use(bodyParser.json())


server.post("/api/github/blog", async function(req, res){
  let github_url = "https://raw.githubusercontent.com"+req.body.pathname+".md"
  console.log("真实url", github_url);
  let result = await superagent.get(github_url)
  res.send({result: result.text});

})

// 前端页面
server.get(/^\/zhaoolee.*/ , async function(req, res){
  // 如果能找到对应的文件就返回文件
  console.log(req.path);
  let file_name = req.path.split("/").pop();
  console.log("file_name:", file_name);
  let index_html = "";
  // 如果找不到就返回html
  try{
    index_html = await fs.readFileSync("../dist/"+file_name);
    res.set('Content-Type', 'text/html');
  }
  catch(e) {
    console.log(e);
    index_html = await fs.readFileSync("../dist/index.html")
    res.set('Content-Type', 'text/html');
  }
  res.send(index_html);
}

)

server.listen(9090, function(){
  console.log("服务端口 http://localhost:9090/")
});
