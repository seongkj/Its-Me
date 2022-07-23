import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.clear();
    navigate('/');
    alert('로그아웃 되었습니다.');
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
