import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './Article.scss';
import showdown from 'showdown';


class Article extends React.Component{

  constructor(props){
    super(props);
    this.state={
      html: "",
      name: ""
    }
  }

  componentDidMount(){
    let pathname = window.location.pathname;
    console.log("pathname::", pathname);
    axios.post("http://127.0.0.1:9090/api/github/blog", {
      pathname: pathname
      
    }).then((response)=>{
      console.log(response);
      let md_text = response.data.result
      let converter = new showdown.Converter(),
      html = converter.makeHtml(md_text);
      name = pathname.split("/").pop();
      name = decodeURI(name);
      this.setState({
        html,
        name
      })
    })

    document.getElementById("music").innerHTML = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=496869422&auto=1&height=66"></iframe>'



  }

  render(){
    return(<div className="article">
      <div className="html">
        <div style={{color: "#009688", fontSize: "36px"}} dangerouslySetInnerHTML={{__html: this.state.name}}></div>
        <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      </div>
      <div id="music" ></div>
    </div>)
  }

}


export default Article