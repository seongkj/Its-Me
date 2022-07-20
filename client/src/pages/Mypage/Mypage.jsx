import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import userInfo from '../../assets/mypage.json';
import Header from '../../components/Header';

import {
  getPortfolio,
  getPortfolios,
  postPortfolios,
  deletePortfolios,
} from '../../utils/api';

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

  // 저장 되어있던 포트폴리오 GET
  const [getPofol, setGetPofol] = useState([]);
  useEffect(() => {
    getPortfolios().then((res) => {
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
    const getData = props.data;
    return (
      <div className="PfWrap">
        <Link to={`/edit/${getData.portfolio_idx}`} className="LinkTitle">
          {getData.title}
        </Link>
        <div className="Btns">
          <button type="button" className="Modify">
            수정
          </button>
          <button
            type="button"
            id={getData.portfolio_idx}
            className="Modify"
            onClick={removePofol}
          >
            삭제
          </button>
        </div>
      </div>
    );
  };

  //포트폴리오 생성 POST
  const postPofol = () => {
    const newPofol = {
      template: 1,
      title: '포트폴리오',
      user_idx: localStorage.getItem('userIdx'),
    };
    if (getPofol.length < 3) {
      console.log('생성가능');
      postPortfolios(newPofol).then((res) => {
        console.log(res);
        setGetPofol([...getPofol, res]);
      });
    } else alert('포트폴리오 작성은 최대 3개까지 가능합니다.');
  };
  //포트폴리오 삭제 delete
  const removePofol = (e) => {
    deletePortfolios(e.target.id).then((res) => {
      const delIdx = Number(e.target.id);
      const filterPofol = getPofol.filter((el) => el.portfolio_idx !== delIdx);
      setGetPofol(filterPofol);
    });
  };

  //test 버튼 함수
  async function test() {
    console.log(getPofol);
  }

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
            {getPofol.map((el) => (
              <PortLists key={el.portfolio_idx} data={el} />
            ))}
            <button type="button" className="MorePf" onClick={postPofol}>
              +
            </button>
            <button type="putton" onClick={test}>
              test버튼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
