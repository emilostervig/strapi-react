import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const STRAPIURL = "https://strapi-emil-3.herokuapp.com/";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    render() {
        return(

            <div className={"PostList"}>
                {this.props.posts.map((el) =>
                    <div className={"single-post"}>
                        <Link to={`/blog/${el.id}`}>
                            <h3 className={"post-title"}>{el.Title}</h3>
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

export default PostList;
