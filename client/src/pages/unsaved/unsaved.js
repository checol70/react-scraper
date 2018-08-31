import React, { Component } from "react";
import { Input, FormBtn } from "../../components/partials/Form";
import Article from "../../components/partials/article";
import Axios from "axios";

class Unsaved extends Component {

    state = {
        articles: [],
        query: "",
        begin: "",
        end: "",
        saved: []
    }

    handleClick = id=>{
        this.saveArticle(id);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        if (name !== "query") {
            if (isNaN(value)) {
                return;
            }
            const res = value.substring(0, 8);
            this.setState({ [name]: res });
            return;
        }
        this.setState({
            [name]: value
        });
    }

    saveArticle = id => {
        if(this.state.articles[id].saved){
            Axios.delete("/api/articles", {data:{web_url: this.state.articles[id].web_url}})
            .then(res => {
                console.log(res)
                this.setState({
                    articles: this.state.articles.map((e, i) => {
                        if (i === id) {
                            e.saved = false;
                        }
                        return e;
                    })
                })
            })  
        }else{
            Axios.post("/api/articles", this.state.articles[id])
            .then(res => {
                console.log(res)
                this.setState({
                    articles: this.state.articles.map((e, i) => {
                        if (i === id) {
                            e.saved = true;
                        }
                        return e;
                    })
                })
            })
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("Submited")
        if (this.state.query !== "") {
            let url = `/nyt/articles/${this.state.query.toLowerCase()}`
            if (this.state.begin !== "" && this.state.begin.length === 8) {
                url += `/${this.state.begin}`
                if (this.state.end !== "" && this.state.end.length === 8) {
                    url += `/${this.state.end}`
                }
            }
            Axios.get(url)
                .then(res => {
                    this.setState({
                        articles: res.data.docs.map(e => {
                            e.saved = false;
                            return e;
                        })
                    })
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div>
                <h1>Get Articles that haven't been saved!</h1>
                <form>
                    <Input
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        name="query"
                        placeholder="query (required)"
                    />
                    <Input
                        value={this.state.begin}
                        onChange={this.handleInputChange}
                        name="begin"
                        placeholder="Begin Date (YYYYMMDD)"
                    />
                    <Input
                        value={this.state.end}
                        onChange={this.handleInputChange}
                        name="end"
                        placeholder="End Date (YYYYMMDD)"
                    />
                    <FormBtn
                        disabled={!(this.state.query)}
                        onClick={this.handleFormSubmit}
                    >
                        Look up articles!
                    </FormBtn>
                </form>
                {this.state.articles.map((e, i) => {
                    return (
                        <Article {...e} key={i} click={()=>this.handleClick(i)}/>
                    )
                })}
            </div>
        )
    }
}


export default Unsaved;