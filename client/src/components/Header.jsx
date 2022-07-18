import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="HeaderContainer">
      <p className="HeaderTitle"><Link to="/">It's me</Link></p>
      <ul className="NavLinks">
        <li className="NavLink"><Link to="/signup">회원가입</Link></li>
        <li className="NavLink"><Link to="/login">로그인</Link></li>
      </ul>
    </div>
  );
}

export default Header;
