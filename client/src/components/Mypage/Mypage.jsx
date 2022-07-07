import React, { useState, useEffect, useRef } from 'react';
import '../../pages/Mypage.css';
import userInfo from '../../assets/mypage.json';

const datas = userInfo.map((data) => {
  return data;
});

const Mypage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userImg, setUserImg] = useState('');
  const [copyPf, setCopyPf] = useState('');

  useEffect(() => {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].name === '홍길동') {
        setUserName(datas[i].name);
        setUserEmail(datas[i].email);
        setUserPhone(datas[i].phone);
        setUserImg(datas[i].profile_img);
      }
    }
  }, []);

  const copyPfFunc = (e) => {
    console.log(e);
  };

  // function ready() {
  //   const aa = document.querySelector('.Pf');
  //   const bb = document.querySelector('.PfWrap');
  //   const dv = event.currentTarget;
  //   const cc = dv.parentNode;
  //   const dd = bb.cloneNode();
  //   const copyPf = () => {
  //     aa.appendChild(dd);
  //   };
  // }
  // document.addEventListener('DOMContentLoaded', ready);

  return (
    <div className="Mypage">
      <div className="UserInfo">
        <div className="ImgWrap">
          <img src={userImg} alt="" />
        </div>
        <div className="TxtWrap">
          <ul>
            <li>이름 : {userName}</li>
            <li>이메일 : {userEmail}</li>
            <li>연락처 : {userPhone}</li>
          </ul>
        </div>
      </div>

      <div className="Portfolios">
        <h2>포트폴리오</h2>
        <div className="Pf">
          <div className="PfWrap">
            <a href="/">안녕하세요, ㅇㅇㅇ의 포트폴리오 입니다.</a>
            <div className="Btns">
              <button type="button" className="Modify">
                수정
              </button>
              <button type="button" className="Copy">
                복사
              </button>
            </div>
          </div>
          <button type="button" className="MorePf">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
