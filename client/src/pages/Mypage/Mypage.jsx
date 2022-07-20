import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import userInfo from '../../assets/mypage.json';
import Header from '../../components/Header';

import { getPortfolio, getPortfolios, postPortfolios } from '../../utils/api';

const datas = userInfo.map((data) => {
  return data;
});

const Mypage = () => {
  const token = localStorage.getItem('token') || '';
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userImg, setUserImg] = useState('');
  const [portfolios, setPortfolios] = useState([
    {
      url: '/test',
      destcription: `새로운 포트폴리오`,
    },
  ]);

  // 저장 되어있던 포트폴리오
  const [getPofol, setGetPofol] = useState([]);
  useEffect(() => {
    getPortfolios().then((res) => {
      console.log(res);
      setGetPofol(res);
    });
  }, []);

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

  const PortLists = (props) => {
    const portList = props.data.map((e, i) => {
      return (
        <div key={i} className="PfWrap">
          <Link to={e.url} className="LinkTitle">
            {e.destcription}
          </Link>
          <div className="Btns">
            <button type="button" className="Modify">
              수정
            </button>
          </div>
        </div>
      );
    });
    return portList;
  };

  const handleMorePort = (e) => {
    if (portfolios.length < 3) {
      setPortfolios([
        ...portfolios,
        {
          url: '/test',
          destcription: `${userName}의 새로운 포트폴리오`,
        },
      ]);
    } else alert('포트폴리오 작성은 최대 3개까지 가능합니다.');
  };

  return (
    <div className="Mypage">
      <Header />
      <div className="MypageWrap">
        <div className="UserInfo">
          <div className="ImgWrap">
            <img src={userImg} alt="" />
          </div>
          <div className="TxtWrap">
            <ul>
              <li>
                <span>이름</span>
                {userName}
              </li>
              <li>
                <span>이메일</span>
                {userEmail}
              </li>
              <li>
                <span>연락처</span>
                {userPhone}
              </li>
            </ul>
          </div>
        </div>
        <div className="Portfolios">
          <h2>포트폴리오</h2>
          <div className="Pf">
            {getPofol.map((el, i) => (
              <PortLists key={i} data={portfolios} />
            ))}
            {/* <PortLists data={portfolios} /> */}
            <button type="button" className="MorePf" onClick={handleMorePort}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
