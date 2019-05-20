import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import { withRouter } from "react-router";
const STRAPIURL = "https://strapi-emil-3.herokuapp.com";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    goBack = () => {
        this.props.history.goBack();
    };
    componentWillMount() {
        this.props.getPost(this.props.id);
    };
    componentWillUnmount() {
        this.props.clearPost();
    };

    render() {
        let img;
        if(this.props.post.Image == null){
            img = "";
        } else{
            img = <img className={"page-image"} src={STRAPIURL+this.props.post.Image.url}/>;
        }
        return(
            <React.Fragment>
            <div className={"post"}>
                <h2>{this.props.post.Title}</h2>
                <div className={"page-content"}>
                    {img}
                    <ReactMarkdown source={this.props.post.Content}/>
                </div>
            </div>
            <div className="back-to-blog">
                <NavLink to={"/blog"}>
                    Back to blog
                </NavLink>
                <button onClick={this.goBack}>
                    Back to blog (browserhistory)
                </button>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Post);
