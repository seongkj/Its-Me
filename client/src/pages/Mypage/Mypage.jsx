import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import userInfo from '../../assets/mypage.json';
import Header from '../../components/Header';

const datas = userInfo.map((data) => {
  return data;
});

const Mypage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userImg, setUserImg] = useState('');
  const [portfolios, setPortfolios] = useState([
    {
      url: '/test',
      destcription: `안녕하세요, ${userName}의 포트폴리오입니다.`,
    },
  ]);

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

  console.log(userName);

  const PortLists = (props) => {
    const handleCopyPort = (e) => {
      e.preventDefault();
      alert('복사ㅏㅏㅏㅏ');
    };
    const portList = props.data.map((e) => {
      return (
        <div className="PfWrap">
          <Link to={e.url} className="LinkTitle">
            {e.destcription}
          </Link>
          <div className="Btns">
            <button type="button" className="Modify">
              수정
            </button>
            <button type="button" className="Copy" onClick={handleCopyPort}>
              복사
            </button>
          </div>
        </div>
      );
    });
    return portList;
  };

  const handleMorePort = (e) => {
    e.preventDefault();
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

  const handleCopyPort = (event) => {
    event.preventDefault();
    setPortfolios([...portfolios, { url: '/test', description: '안녕하세여, ㅇㅇㅇ의 포트폴리오입니다.'}])
  }

  return (
    <div className="Mypage">
      <div
        className="MainBG"
        style={{ height: '10vh', position: 'relative', marginBottom: '100px' }}
      ></div>
      <Header />
      <div className="MypageWrap">
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
      </div>

      <div className="Portfolios">
        <button type="button" className="MorePf" onClick={handleCopyPort}>
          +
        </button>
        <h2>포트폴리오</h2>
        {portfolios.map(portfolio => (
            <div className="Pf">
              <div className="PfWrap">
                <a href="/">안녕하세요, ㅇㅇㅇ의 포트폴리오 입니다.</a>
                <div className="Btns">
                  <button type="button" className="Modify" onClick={handleCopyPort}>
                    수정
                  </button>
                  <button type="button" className="Copy">
                    복사
                  </button>
                </div>
              </div>

            </div>
        ))}
        {/*<div className="Pf">*/}
        {/*  <div className="PfWrap">*/}
        {/*    <a href="/">안녕하세요, ㅇㅇㅇ의 포트폴리오 입니다.</a>*/}
        {/*    <div className="Btns">*/}
        {/*      <button type="button" className="Modify">*/}
        {/*        수정*/}
        {/*      </button>*/}
        {/*      <button type="button" className="Copy">*/}
        {/*        복사*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <button type="button" className="MorePf">*/}
        {/*    +*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Mypage;
