import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const token = localStorage.getItem('token') || '';

function Header() {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="HeaderContainer">
      <p className="HeaderTitle">
        <Link to="/">It's me</Link>
      </p>
      <ul className="NavLinks">
        {token ? (
          <li className="NavLink">
            <Link to="/mypage">마이페이지</Link>
          </li>
        ) : (
          <li className="NavLink">
            <Link to="/signup">회원가입</Link>
          </li>
        )}
        {token ? (
          <li className="NavLink">
            <a onClick={onClick} href="/">
              로그아웃
            </a>
          </li>
        ) : (
          <li className="NavLink">
            <Link to="/login">로그인</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
