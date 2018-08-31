import React, { Component } from "react";

class Article extends Component{
    state={
        saved: this.props.saved
    }
    handleOnClick = (event)=>{
        this.props.click();
        const strs =window.location.href.split("/")
        if(strs[strs.length-1]!== "saved")this.setState({saved:!this.state.saved})
        console.log("clicked")
    }
    saveOrDelete =()=>{
        console.log(this.state.saved)
        if(this.state.saved){
            return "Delete";
        }else{
            return "Save";
        }
    }
    render(){
        return(
    <div>
        <h4>
            {this.props.headline.main}
        </h4>
        <p>{this.props.pub_date}</p>
        <a href={this.props.web_url} target="_blank">
            {this.props.web_url}
        </a>
        <p>{this.props.snippet}</p>
        <button onClick={this.handleOnClick}>{this.saveOrDelete()}</button>
    </div>
)}
}

export default Article;