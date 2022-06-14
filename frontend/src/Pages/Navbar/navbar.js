import React, { Component } from "react"
import {Button,Nav} from "react-bootstrap"
import "./Navbar.css"
import Switch from "react-bootstrap/esm/Switch"

class Navbar extends Component{
    state= {clicked:false};
    handleClick=()=>
    {
        this.setState({clicked:!this.state.clicked})
    };

    render(){
        return(
            <nav className="navbarItems">
                <h1 className="navbar-logo">REStful Web Services</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className= {this.state.clicked?"fas fa-times":"fas fa-bars"}></i>
                </div>
                <ul className= {this.state.clicked?"nav-menu active":"nav-menu"}>
                <li className="nav-links-addNewCost">
                    <a href="/addCostItem" className="nav-links-addNewCost">Add New Cost</a>
                </li>
                <li className="nav-links-addNewCost">
                    <a href="/addnewsomething" className="nav-links-addNewCost">add new something</a>
                </li>
                </ul>
                </nav>
        );
    }
}
export default Navbar;