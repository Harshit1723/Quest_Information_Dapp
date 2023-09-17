import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/admin" >admin</Link>
            <Link to="/about">about</Link>
        </div>
  )
}

export default Navbar