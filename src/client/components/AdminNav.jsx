import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Admin from './Admin.jsx';
import {
  Route,
  Link
} from 'react-router-dom';

class AdminNav extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
  
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
  
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="mr-auto"><Link to="/">Admin Page</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink><Link to="/">Home</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to="/admin/create">Create Page</Link></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Route exact path="/admin" component={Admin}/>
            </div>
        );
    }
}

export default AdminNav;