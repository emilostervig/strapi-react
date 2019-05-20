import React, {Component} from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import {Switch} from "react-router-dom";


import { withRouter } from "react-router";


import PostList from './PostList';
import CategoryList from './CategoryList';
import Page from './Page';
import Post from './Post';

const STRAPIURL = "https://strapi-emil-3.herokuapp.com";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: {},
            pages: [],
            page: {},
            categories: [],
            category: {}
        };

    }


    componentWillMount() {
        this.getPosts();
        this.getPages();
        this.getCategories();
    }

    getPosts = () => {
        fetch(`${STRAPIURL}/posts`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                console.log(`${STRAPIURL}/posts`);
                this.setState({
                    posts: json,
                })
            });
    };
    getPost = (id) => {
        // check if we already have post in state
        let maybePost = this.state.posts.find(el => {
            return el.id == id;
        });
        if(maybePost != null){
            this.setState({
                post: maybePost
            });
            return true;
        }

        fetch(`${STRAPIURL}/posts/${id}`)
            .then(res => res.json())
            .then(json => {
                console.log(`${STRAPIURL}/posts/${id}`);
                console.log(json)
                this.setState({
                    post: json,
                })
            });
    };
    getPages = () => {
        fetch(`${STRAPIURL}/pages`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    pages: json,
                })
            });
    };
    getPage = (slug) => {

        let maybePage = this.state.pages.find(el => {
            return el.Slug == slug;
        });
        if(maybePage != null){
            this.setState({
                page: maybePage
            });
            console.log(maybePage);

            return true;
        }


        fetch(`${STRAPIURL}/pages?Slug=${slug}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);

                this.setState({
                    page: json[0]
                });

            });
    };


    getCategories = () => {
        fetch(`${STRAPIURL}/categories`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    categories: json
                });

            });
    };

    getCategory = (id) => {
        let maybeCategory = this.state.categories.find(el => {
            return el.id == id;
        });
        if(maybeCategory != null){
            this.setState({
                category: maybeCategory
            });
            return true;
        }


        fetch(`${STRAPIURL}/categories?id=${id}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);

                this.setState({
                    page: json[0]
                });

            });
    }

    clearPost = () => {
        this.setState({
            post: {}
        });
    };
    clearPage = () => {
        this.setState({
            page: {}
        })
    };
    clearCategory = () => {
        this.setState({
            category: {}
        })
    };

    render() {
        return (
            <div className="App">
                <Router>
                <header >
                    <nav>
                        <ul className={"menu"}>
                            <li className={"menu-item"}>
                                <NavLink exact to={"/"} activeClassName={"active"}>
                                    Home
                                </NavLink>
                            </li>
                            <li className={"menu-item"}>
                                <NavLink to={"/blog"} activeClassName={"active"}>
                                    Blog
                                </NavLink>
                            </li>
                            <li className={"menu-item"}>
                                <NavLink to={"/categories"} activeClassName={"active"}>
                                    Categories
                                </NavLink>
                            </li>


                            {this.state.pages.map((el) =>
                                <li className={"menu-item"}>
                                    <NavLink to={`/${el.Slug}`} activeClassName={"active"}>
                                        {el.Title}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>

                <main>
                    <div className={"container"}>

                    <Switch>

                        <Route exact path={'/'}
                               render={(props) =>
                                   <h1>Strapi website</h1>
                               }>

                        </Route>

                        <Route exact path={'/blog'}
                               render={(props) =>
                                   <PostList posts={this.state.posts}/>
                               }>

                        </Route>

                        <Route path={'/blog/:id'}
                               render={(props) =>
                                   <Post renderMarkdown={this.renderMarkdown}
                                         id={props.match.params.id}
                                         getPost={this.getPost}
                                         post={this.state.post}
                                         clearPost={this.clearPost}
                                   />
                               }>
                        </Route>

                        <Route exact path={'/categories'}
                               render={(props) =>
                                   <CategoryList renderMarkdown={this.renderMarkdown}
                                         categories={this.state.categories}
                                   />
                               }>
                        </Route>

                        <Route path={'/category/:id'}
                               render={(props) =>
                                   <Post renderMarkdown={this.renderMarkdown}
                                         id={props.match.params.id}
                                         getCategory={this.getCategory}
                                         category={this.state.category}
                                         clearCategory={this.clearCategory}
                                   />
                               }>
                        </Route>

                        <Route path={'/:slug'}
                               render={(props) =>
                                    <Page renderMarkdown={this.renderMarkdown}
                                          slug={props.match.params.slug}
                                          getPage={this.getPage}
                                          page={this.state.page}
                                          clearPage={this.clearPage}
                                          key={props.match.params.slug}
                                    />
                               }>

                        </Route>

                    </Switch>
                    </div>



                </main>


                </Router>
            </div>
        );
    }
}

export default App;
