function ajax(method, url, params){
  this.uploadComplete = function(e){
    console.log("上传成功获取的事件::", e);
  }.bind(this);


  this.uploadFailed = function(e){
    console.log("上传失败获取的事件::", e);
  }.bind(this);



  var xhr = new XMLHttpRequest();
  xhr.onload = this.uploadComplete; // 添加 上传成功后的回调函数
  xhr.onerror =  this.uploadFailed; // 添加 上传失败后的回调函数
  xhr.upload.onprogress = progressFunction; // 添加 监听函数

  if(method === "GET"){
    params.keys().map((value, index)=>{
      
    })

    let url = url +
    

    xhr.open(method, url, true);
  }
  xhr.send(form);
}