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
      if([".git", ".vscode"].indexOf(dir_name) === -1){
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
  new_contents_md += "---start\n\n";
  contents.map((value, index)=>{
    new_contents_md+="- ["+value["title"] + "](" + value["url"] + ")\n"
  })
  new_contents_md += "\n\nend---\n";

  old_contents_md =  read_me_data_before.match(/---start[\s\S]*?end---/gi);

  read_me_data_after = read_me_data_before.replace(old_contents_md, new_contents_md)
  console.log("旧的README信息::", read_me_data_before);
  console.log("新的README信息::", read_me_data_after);


  fs.writeFileSync("./README.md", read_me_data_after);






}

async function main(){
  // github仓库地址
  let repo_github_url = "https://github.com/zhaoolee/Blog";
  // github文件地址
  let repo_github_file_url = repo_github_url+ "/" + "blob" + "/master";
  // 当前项目所在目录
  let repo_local_path = path.resolve(__dirname);
  //读取目录下所有文件的路径
  let all_files = await get_file_path_name("./");
  let md_path_name_files = get_md_path_name(all_files);
  let github_path_name_files = [];
  // 替换并生成github目录
  md_path_name_files.map((value, index)=>{
    github_path_name_files.push(value.replace(repo_local_path, repo_github_file_url));
  })


  // 目录信息
  let contents = []

  github_path_name_files.map((value, index)=>{
    let contents_atom = {title: "", url: ""}
    contents_atom["title"] = value.split("/").pop().replace(".md", "");
    contents_atom["url"] = value
    contents.push(contents_atom)
  })



  addContentsInfo(contents);




}



main();