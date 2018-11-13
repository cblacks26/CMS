import React, { Component } from 'react';
import Home from './Home.jsx';
import Page from './Page.jsx';
import {
  Route,
  Redirect,
  Link
} from 'react-router-dom';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            pages: []
        }
    }
    
    componentWillMount(){
        fetch('https://react-site-cblacks.c9users.io/admin/page')
        .then(data => data.json())
        .then((data) => this.setState({pages:data}))
        .catch(err => console.log(err));
    }
    
    render(){
        let comps = [];
        let links = [];
        let home = null;
        this.state.pages.forEach(page=> {
            if(page.url === '/') {
                home = <h2><Link to="/">{page.name}</Link></h2>;
                comps.push(<Route path="/" render={(props) => <Home {...props} sections={page.sections} />}/>);
            }
            comps.push(<Route path={page.url} render={(props) => <Page {...props} sections={page.sections} />} />);
            links.push(<li><Link to={page.url}>{page.name}</Link></li>);
        });
        return(
            <div>
                <header>
                    {home}
                    <nav>{links}</nav>
                </header>
                {comps}
                <Redirect to='/'/>
                <footer>
                    <li><Link to="/admin">Admin</Link></li>
                </footer>
            </div>
        )
    }
}
export default Nav;