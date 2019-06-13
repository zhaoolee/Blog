const fs = require("fs");
const path = require("path");

async function get_file_path_name(dir){
  dir = path.resolve(dir);
  dir_list = fs.readdirSync(dir);
  dir_list = dir_list.map((value, index)=>{
    return (dir+"/"+value)
  })
  let result = [];
  await dir_list.map(async (value, index)=>{
    // 如果是文件, 返回一个数组
    let stat = fs.statSync(value);
    if(stat.isFile()){
      result.push(value);
      return result;
    }
    // 如果是文件夹, 返回文件夹内的文件数组
    if(stat.isDirectory()){
      let dir_name = value.split("/").pop()
      if([".git", ".vscode", "node_modules"].indexOf(dir_name) === -1){
        tmp_return = await get_file_path_name(value);
        tmp_return.map((value, index)=>{
          result.push(value)
        })
      }
    }
  })
  return result;
}


function get_md_path_name(all_files){
  let result = [];
  all_files.map((value, index)=>{
    if(value.endsWith(".md")){
      result.push(value)
    }
  })
  return result
}


function addContentsInfo(contents){

  let read_me_data_before = fs.readFileSync("./README.md").toString();

  // 生成目录md字符

  let new_contents_md = ""
  new_contents_md += "---start---\n\n";
  contents.map((value, index)=>{
    new_contents_md+="- ["+value["title"] + "](" + value["url"] + ") | [测试链接]("+ value["fangyuan_url"]+")"+"\n\n"
  })
  new_contents_md += "\n\n---end---\n";

  old_contents_md =  read_me_data_before.match(/---start---[\s\S]*?---end---/gi);

  read_me_data_after = read_me_data_before.replace(old_contents_md, new_contents_md)
  console.log("旧的README信息::", read_me_data_before);
  console.log("新的README信息::", read_me_data_after);
  console.log("链接信息:", contents);
  fs.writeFileSync("./README.md", read_me_data_after);

  return contents;

}

async function main(){
  // github仓库地址
  let repo_github_url = "https://github.com/zhaoolee/Blog";
  // github文件地址
  let repo_github_file_url = repo_github_url+ "/" + "blob" + "/master";
  // 纯粹的markdown地址
  let markdown_data_base = "https://raw.githubusercontent.com/zhaoolee/Blog/master"
  // 当前项目所在目录
  let repo_local_path = path.resolve(__dirname);
  //读取目录下所有文件的路径
  let all_files = await get_file_path_name("./");
  let md_path_name_files = get_md_path_name(all_files);
  let github_path_name_files = [];
  // 替换并生成github目录
  md_path_name_files.map((value, index)=>{
    let url =value.replace(repo_local_path, repo_github_file_url); 
    let markdown_url = url.replace("https://github.com/zhaoolee/Blog/blob", "https://raw.githubusercontent.com/zhaoolee/Blog")
    let fangyuan_url = markdown_url.replace("https://raw.githubusercontent.com", "http://fangyuanxiaozhan.com")
    fangyuan_url = fangyuan_url.replace(".md", "")
    github_path_name_files.push(
      {
        url: url,
        markdown_url: markdown_url,
        fangyuan_url: fangyuan_url
      }
    );
  })
  // 替换并生成markdonw数据目录



  // 目录信息
  let contents = []

  github_path_name_files.map((value, index)=>{
    let contents_atom = {title: "", url: "", markdown_url: ""}
    contents_atom["title"] = value["url"].split("/").pop().replace(".md", "");
    contents_atom["url"] = value["url"];
    contents_atom["markdown_url"] = value["markdown_url"];
    contents_atom["fangyuan_url"] = value["fangyuan_url"];

    contents.push(contents_atom)
  })

  return addContentsInfo(contents);

}



main();


module.exports.build=main;
