// Menu.js
import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    background-color: #333;
    color: #fff;
    padding: 10px;
`;

const Nav = styled.nav`
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    ul li {
        display: inline;
        margin-right: 20px;
    }

    a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
    }
`;

const Menu = () => {
    return (
        <Header>
            <Nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </Nav>
        </Header>
    );
};

export default Menu;
