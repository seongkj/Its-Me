/* eslint-disable */
import React from 'react';
import './Main.css';
import Header from '../../components/Header';

function Main() {
  return (
    <div>
      <div className="MainBG"></div>
      <Header />
      <div className="MainContainer">
        <p className="MainText">It's me</p>
        <p className="SubText">자신만의 포트폴리오를 만들고 싶다면?</p>
        <a className="MadeBtn" href="#">
          만들기
        </a>
      </div>
    </div>
  );
}

export default Main;
