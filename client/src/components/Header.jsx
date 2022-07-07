/* eslint-disable */
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="HeaderContainer">
      <p className="Title">It's me</p>
      <ul className="NavLinks">
        <li className="NavLink"><a href="signup">회원가입</a></li>
        <li className="NavLink"><a href="login">로그인</a></li>
      </ul>
    </div>
  );
}

export default Header;
