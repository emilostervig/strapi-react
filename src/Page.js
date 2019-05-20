import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

const STRAPIURL = "https://strapi-emil-3.herokuapp.com";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentWillReceiveProps(nextProps, nextContext) {

    }

    componentWillMount() {
        this.props.getPage(this.props.slug);
    }
    componentDidMount() {
        this.props.getPage(this.props.slug);
    }

    componentWillUnmount() {
        //this.props.clearPage();
    }

    render() {
        let img;
        if(this.props.page.Image == null){
            img = "";
        } else{
            img = <img className={"page-image"} src={STRAPIURL+this.props.page.Image.url}/>;
        }
        return(

            <div className={"page"}>
                <h2>{this.props.page.Title}</h2>
                {img}
                <div className={"page-content"}>
                    <ReactMarkdown source={this.props.page.Content}/>
                </div>
            </div>
        );
    }
}

export default Page;
