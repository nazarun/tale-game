import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import '../App.scss';

class Header extends Component {

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Todo List</h2>
            </header>
        );
    }
}

export default Header;
