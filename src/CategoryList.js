import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';


import PostList from './PostList';


const STRAPIURL = "https://strapi-emil-3.herokuapp.com/";

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    getPostList = (posts) => {
        let filteredPosts = posts.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return filteredPosts.slice(0,5);
    }
    render() {

        return(

            <div className={"category-list"}>
                {this.props.categories.map((el) =>

                    <aside className={"single-category"}>
                        <Link to={`/categories/${el.id}`}>
                            <h2 className={"category-title"}>{el.Title}</h2>
                        </Link>
                        <div className={"desc"}>
                            <ReactMarkdown source={el.description}/>
                        </div>
                        <PostList posts={this.getPostList(el.posts)}/>
                    </aside>
                )}
            </div>
        );
    }
}

export default CategoryList;
