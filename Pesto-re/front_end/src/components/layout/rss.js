import React, { Component } from "react";
import ReactDOM from 'react-dom';

import "./rss.css"

class rss extends Component {
    constructor() {
      super();
      this.myref = React.createRef();
      this.xhr = {}
      this.obj = {
        divinner: {},
        getNews : () =>
        {
            this.xhr = new XMLHttpRequest();
            this.xhr.onreadystatechange =  this.obj.processNews;
            // Using a cors proxy to access the rss feed
            this.xhr.open("GET","https://cors-anywhere.herokuapp.com/https://www.nasa.gov/rss/dyn/breaking_news.rss",true);
            this.xhr.send();
        },
        processNews : () =>
        {
            if (this.xhr.readyState == 4 && this.xhr.status == 200)
            {
                let root = this.xhr.responseXML.documentElement;
                let items = root.getElementsByTagName("item")[0];
                let title = root.getElementsByTagName("title")[0];
                let link = root.getElementsByTagName("link")[0];
                let ele = document.createElement("a");
                ele.innerHTML = title.firstChild.nodeValue;
                ele.href = link.firstChild.nodeValue;
                
                let eled = document.createElement("div");
                eled.appendChild(ele);
                eled.className = "marquee";
                console.log(eled);

                this.obj.divinner.innerHTML = "";
                this.obj.divinner.appendChild(eled);
            }
        }
     };
    }
  

    componentDidMount() {
        this.obj.divinner = this.myref.current;
        this.obj.divinner.style.left = window.innerWidth - 5 + "px";
        this.obj.getNews();
        setInterval(this.obj.getNews,10000);
    }
  
    render() {
      return (
        <div >
            <div ref = {this.myref}>
            </div>
        </div>
      );
    }
  }

export default rss;