import React, { Component } from "react";
import Article from "../../components/partials/article";
import Axios from "axios";


class Saved extends Component {
    state = {
        articles: []
    }
    handleClick = id=>{
        this.deleteArticle(id);
    }

    componentDidMount = () => {
        Axios.get("/api/articles").then(res => {
            console.log(res);
            this.setState({
                articles: res.data.map(e => {
                    e.saved = true;
                    return e;
                })
            })
        })
            .catch(err => console.log(err));
    }

    deleteArticle = id => {
        console.log("deleting something",this.state.articles[id])
        Axios.delete("/api/articles", {data:{web_url: this.state.articles[id].web_url}})
            .then(res => {
                this.setState({
                    articles: this.state.articles.filter((e, i) => {
                        e.saved=true;
                        return i !== id
                    })
                })
            }).catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <h1>See the articles that everyone has saved!</h1>

                {this.state.articles.map((e, i) => {
                    return (
                        <Article {...e} key={i} click={() => this.handleClick(i)} />
                    )
                })}
            </div>
        )
    }
}
export default Saved;