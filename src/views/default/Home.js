// import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Nav from 'layout/nav/Nav';
import React from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = ()=>{
    const navStyle = {
        display:"flex",
        justifyContent:"flex-end",
        padding:"15px"
    };
    const LinkStyle = {
        display:"inline-block",
        padding:"12px 40px",
        background:"dodgerblue",
        color:"#f1f1f1",
        borderRadius:"12px",
        fontSize:"16px",
        textTransform:"capitalize",
        fontWeight:"700"

    }
    return(
        <>
        <header style={{"height":"100vh","background":"#f1f1f1"}}>
            <nav style={navStyle}>
                <Link to="/login" style={LinkStyle}>
                    login
                </Link>
            </nav>
            <h1 style={{fontSize:"100px",textAlign:"center"}}>
                LANDING PAGE
            </h1>
        </header>
        </>
    )
};

export default Home;
