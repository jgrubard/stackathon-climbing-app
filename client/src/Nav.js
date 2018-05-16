import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      Navigation
      <ul>
      <li>
      <Link to='/'>Home</Link>
      </li>
      </ul>
    </div>
  );
}

export default Nav;
