import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './Article.scss';
import showdown from 'showdown';


class Article extends React.Component{

  constructor(props){
    super(props);
    this.state={
      html: ""
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
      this.setState({
        html
      })
    })



  }

  render(){
    return(<div className="article">
      <div className="html">
        <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      </div>
    </div>)
  }

}


export default Article