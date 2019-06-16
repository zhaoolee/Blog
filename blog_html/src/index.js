import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
const pathToRegexp = require('path-to-regexp')
import Article from './Article';


class Index extends React.Component{

  constructor(props){
    super(props)

  }

  componentDidMount(){

    console.log("index-href::", window.location.href);
    
  }

  render(){
    return(
      <Router>
      <div>

          <Route Path= "/zhaoolee/Blog" key="/zhaoolee/Blog" 
          component = {
             () => <Article
             
             />
            }
          />

          <Route Path="/" key="/" 
          component = {
             () => <div></div>
            }
          />

      </div>
      </Router>
      )
  }
}


ReactDOM.render(<Index/> , document.getElementById('root'))