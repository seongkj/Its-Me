import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import userInfo from '../../assets/mypage.json';
import Header from '../../components/Header';
import axios from 'axios';
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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userImg, setUserImg] = useState('');
  const [state, setState] = useState('');
  const [imgFile, setImgFile] = useState('');

  // 유저 정보, 유저 포폴 정보
  const getToken = localStorage.getItem('token');
  const getUserIdx = localStorage.getItem('userIdx');

  const [inputs, setInputs] = useState({
    user_idx: Number(getUserIdx),
    profile_img: '',
    name: '',
    email: '',
    phone: '',
  });

  const { user_idx, profile_img, name, email, phone } = inputs;

  // user 정보 get
  const getUserInfo = () => {
    axios
      .get(`http://localhost:3001/users/${getUserIdx}`, {
        headers: {
          authorization: getToken,
        },
      })
      .then((res) => {
        setUserName(res.data.data[0].name);
        setUserEmail(res.data.data[0].email);
        setUserPhone(res.data.data[0].phone);
        setUserImg(res.data.data[0].profile_img);
      })
      .catch((err) => console.log(err));
  };

  // 저장 되어있던 포트폴리오 GET
  const [getPofol, setGetPofol] = useState([]);
  useEffect(() => {
    getPortfolios().then((res) => {
      setGetPofol(res);
    });
  }, []);

  getUserInfo();

  const PortLists = (props) => {
    const getData = props.data;
    return (
      <div className="PfWrap">
        <Link
          to={`/PdfComponent/${getData.portfolio_idx}`}
          className="LinkTitle"
        >
          {getData.title}
        </Link>
        <div className="Btns">
          <Link to={`/edit/${getData.portfolio_idx}`}>
            <button type="button" className="Modify">
              수정
            </button>
          </Link>
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

  // 팝업창
  const openPopup = () => {
    document.querySelector('.ProfilePopup').style.display = 'block';
  };
  const closePopup = () => {
    document.querySelector('.ProfilePopup').style.display = 'none';
  };

  // 정보수정

  const editProfile = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 이미지 미리보기
  const previewImg = (e) => {
    const reader = new FileReader();
    const img = e.target.files[0];
    setImgFile(img);
    reader.readAsDataURL(img);
    reader.onload = function (e) {
      setState(e.target.result);
    };
  };

  const UserInfo = () => {
    return (
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
        <button type="button" className="ProfileEdit" onClick={openPopup}>
          프로필 수정
        </button>
      </div>
    );
  };

  // 프로필 업데이트
  const patchProfile = () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('user_idx', getUserIdx);
    formData.append('img', imgFile);

    axios
      .patch(`http://localhost:3001/users/${getUserIdx}`, formData, {
        headers: {
          authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => getUserInfo())
      .catch((err) => console.log(err));
    document.querySelector('.ProfilePopup').style.display = 'none';
  };

  //포트폴리오 생성 POST
  const postPofol = () => {
    const newPofol = {
      template: 1,
      title: '포트폴리오',
      user_idx: localStorage.getItem('userIdx'),
    };
    if (getPofol.length < 3) {
      postPortfolios(newPofol).then((res) => {
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

  return (
    <div className="Mypage">
      <div className="ProfilePopup">
        <div className="wrap">
          <form>
            <div className="Buttons">
              <button type="button" onClick={patchProfile}>
                저장
              </button>
              <button type="button" onClick={closePopup}>
                취소
              </button>
            </div>
            <div className="ImgWrap">
              <p>프로필 이미지</p>
              <div className="InputWrap">
                <img src={state} alt="" name="thumbnail" />
                <label htmlFor="ImgInput">+</label>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  id="ImgInput"
                  onChange={previewImg}
                  style={{ position: 'absolute', left: '0', top: '0' }}
                />
              </div>
            </div>
            <div className="TxtWrap">
              <div>
                <p>이름</p>
                <input type="text" name="name" onChange={editProfile}></input>
              </div>
              <div>
                <p>이메일</p>
                <input type="text" name="email" onChange={editProfile}></input>
              </div>
              <div>
                <p>연락처</p>
                <input type="text" name="phone" onChange={editProfile}></input>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Header />
      <div className="MypageWrap">
        <UserInfo />
        <div className="Portfolios">
          <h2>포트폴리오</h2>
          <div className="Pf">
            {getPofol.map((el) => (
              <PortLists key={el.portfolio_idx} data={el} />
            ))}
            <button type="button" className="MorePf" onClick={postPofol}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
