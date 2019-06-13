const express = require("express");
const expressStatic = require("express-static");
const superagent = require('superagent');
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');

const fs = require("fs");

const cors = require("cors");
let server = express();

server.use('/', history())

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


server.get("/*", async function(req, res){
  let index_html = await fs.readFileSync("../dist/index.html")
  res.set('Content-Type', 'text/html');
  res.send(index_html);
})




server.listen(9090, function(){
  console.log("服务端口 http://localhost:9090/")
});
