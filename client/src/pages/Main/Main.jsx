import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Main() {
  const token = localStorage.getItem('token') || '';

  return (
    <div>
      <div className="MainBG"></div>
      <Header />
      <div className="MainContainer">
        <p className="MainText">It's me</p>
        <p className="SubText">자신만의 포트폴리오를 만들고 싶다면?</p>
        <Link to="/mypage">
          <div className="MadeBtn">만들기</div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
