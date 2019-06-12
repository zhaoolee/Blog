const express = require("express");
const superagent = require('superagent');

let server = express();

server.get("/zhaoolee*", async function(req, res){
  console.log(req.path);
  let github_url = "https://raw.githubusercontent.com"+req.path
  console.log("真实url", github_url);
  let result = await superagent.get(github_url)
  res.send(result.text);
})




server.listen(9090, function(){
  console.log("服务端口 http://localhost:9090/")
});
