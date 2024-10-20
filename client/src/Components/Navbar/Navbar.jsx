// import React from 'react';
// import {
//   navbarStyle,
//   logoStyle,
//   menuStyle,
//   menuItemStyle,
//   menuLinkStyle,
//   navStartStyle,
// } from './NavbarStyles';

// function Navbar() {
//   return (
//     <nav style={navbarStyle}>
//       <div style={logoStyle}>SmartFit & Yoga</div>
//       <ul style={menuStyle}>
//         <li style={menuItemStyle}><a href="/" style={menuLinkStyle}>Home</a></li>
//         <li style={menuItemStyle}><a href="/Plans" style={menuLinkStyle}>Plans</a></li>
//         <li style={menuItemStyle}><a href="/explore" style={menuLinkStyle}>Explore</a></li>
//         <li style={menuItemStyle}><a href="/about" style={menuLinkStyle}>About</a></li>
//         <li style={menuItemStyle}><a href="/login" style={navStartStyle}>Start</a></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;



import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className='nav'>
      <div className="nav-logo">SmartFit & Yoga</div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plans">Plans</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login" className='nav-start' >Start</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;