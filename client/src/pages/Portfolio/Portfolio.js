import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userImg: '',
  });
  const [introduce, setIntroduce] = useState({
    comment: '',
  });
  const [skill, setSkill] = useState([]);
  const [career, setCareer] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [etcEducation, setEtcEducation] = useState([]);
  const [language, setLanguage] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [award, setAward] = useState([]);

  const getToken = localStorage.getItem('token');
  const getUserIdx = localStorage.getItem('userIdx');
  const { portfolio_idx } = useParams();

  // user 정보 get
  const getUserInfo = () => {
    axios
      .get(`http://localhost:3001/users/${getUserIdx}`, {
        headers: {
          authorization: getToken,
        },
      })
      .then((res) => {
        setUserInfo({
          userName: res.data.data[0].name,
          userEmail: res.data.data[0].email,
          userPhone: res.data.data[0].phone,
          userImg: res.data.data[0].profile_img,
        });
      })
      .catch((err) => console.log(err));
  };

  // portfolio get
  const getPortfolio = () => {
    axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        setIntroduce({
          comment: res.data.data.introduce[0].comment,
        });
        setSkill([...res.data.data.skill]);
        setCareer([...res.data.data.career]);
        setEducation([...res.data.data.education]);
        setProject([...res.data.data.website]);
        setLanguage([...res.data.data.language]);
        setCertificate([...res.data.data.certificate]);
        setEtcEducation([...res.data.data.etc_education]);
        setAward([...res.data.data.award]);
      })
      .catch((err) => console.log(err, '실패'));
  };

  useEffect(() => {
    getUserInfo();
    getPortfolio();
  }, []);

  const { userName, userEmail, userPhone, userImg } = userInfo;
  const { comment } = introduce;

  // skill
  const [...skills] = skill;
  const stackList = [];
  for (let el of skills) {
    stackList.push(el.name);
  }

  // career
  const [...careers] = career;
  const startDateList = [];
  const endDateList = [];
  const companyList = [];
  const positionList = [];
  for (let el of careers) {
    startDateList.push(el.start_date);
    endDateList.push(el.end_date);
    companyList.push(el.company);
    positionList.push(el.position);
  }

  // education
  const [...educations] = education;
  const schoolList = [];
  const statusList = [];
  const majorList = [];
  const graduateDateList = [];
  for (let el of educations) {
    schoolList.push(el.school);
    statusList.push(el.status);
    majorList.push(el.major);
    graduateDateList.push(el.graduate_date);
  }

  // project
  const [...projects] = project;
  const firstDateList = [];
  const lastDateList = [];
  const titleList = [];
  const commentList = [];
  const linkList = [];
  for (let el of projects) {
    firstDateList.push(el.start_date);
    lastDateList.push(el.end_date);
    titleList.push(el.title);
    commentList.push(el.comment);
    linkList.push(el.link);
  }

  // etcEducation
  const [...etcEducations] = etcEducation;
  const openDateList = [];
  const closeDateList = [];
  const etcTitleList = [];
  const etcCommentList = [];
  const organizationList = [];
  for (let el of etcEducations) {
    openDateList.push(el.start_date);
    closeDateList.push(el.end_date);
    etcTitleList.push(el.title);
    etcCommentList.push(el.comment);
    organizationList.push(el.organization);
  }

  // award
  const [...awards] = award;
  const awardList = [];
  const getDateList = [];

  for (let el of awards) {
    awardList.push(el.title);
    getDateList.push(el.award_date);
  }

  // certificate
  const [...certificates] = certificate;
  const certificateList = [];
  const grantList = [];
  const grantDateList = [];

  for (let el of certificates) {
    certificateList.push(el.title);
    grantList.push(el.organization);
    grantDateList.push(el.acquisition_date);
  }

  // language
  const [...languages] = language;
  const languageList = [];
  const langGetDateList = [];
  const levelList = [];

  for (let el of languages) {
    languageList.push(el.name);
    langGetDateList.push(el.acquisition_date);
    levelList.push(el.level);
  }
  return (
    <div className="PortfolioWrap">
      <div className="PortUserInfo">
        <div className="PortImgWrap">{<img src={userImg} alt="" />}</div>
        <div className="PortTxtWrap">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{`${userPhone.slice(0, 3)}-${userPhone.slice(
            3,
            7,
          )}-${userPhone.slice(7)}`}</p>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">한줄 소개</p>
        <div className="PortTxtWrap2">
          <p>{comment}</p>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">기술 스택</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>{stackList[0]}</p>
            <p>{stackList[1]}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">경력</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>입사일</p>
            <p>퇴사일</p>
            <p>회사명</p>
            <p>직무</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{startDateList[0].slice(0, 10)}</p>
            <p>{endDateList[0].slice(0, 10)}</p>
            <p>{companyList[0]}</p>
            <p>{positionList[0]}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">학력</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>학교</p>
            <p>상태</p>
            <p>전공</p>
            <p>졸업일(예정일)</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{schoolList[0]}</p>
            <p>{statusList[0]}</p>
            <p>{majorList[0]}</p>
            <p>{graduateDateList[0].slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">프로젝트/웹사이트</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>프로젝트 시작일</p>
            <p>프로젝트 종료일</p>
            <p>프로젝트명</p>
            <p>설명</p>
            <p>링크</p>
          </div>
          <div className="PortTxtWrap3">
            <div className="PortTxtWrap3">
              <p>{firstDateList[0].slice(0, 10)}</p>
              <p>{lastDateList[0].slice(0, 10)}</p>
              <p>{titleList[0]}</p>
              <p>{commentList[0]}</p>
              <p>{linkList[0]}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">교육 및 기타 이력</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>시작일</p>
            <p>종료일</p>
            <p>활동명</p>
            <p>기관</p>
            <p>비고</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{openDateList[0].slice(0, 10)}</p>
            <p>{closeDateList[0].slice(0, 10)}</p>
            <p>{etcTitleList[0]}</p>
            <p>{organizationList[0]}</p>
            <p>{etcCommentList[0]}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">수상</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>수상일</p>
            <p>수상내역</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{awardList[0]}</p>
            <p>{getDateList[0].slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">시험 및 자격증</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>취득일</p>
            <p>자격증명</p>
            <p>발급기관</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{grantDateList[0].slice(0, 10)}</p>
            <p>{certificateList[0]}</p>
            <p>{grantList[0]}</p>
          </div>
        </div>
      </div>
      <hr className="MainHr"></hr>
      <div className="PortEduInfo">
        <p className="PortMainTxt">외국어</p>
        <div className="PortTxtWrap2">
          <div className="PortTxtWrap3">
            <p>취득일</p>
            <p>외국어명</p>
            <p>점수</p>
          </div>
          <div className="PortTxtWrap3">
            <p>{langGetDateList[0].slice(0, 10)}</p>
            <p>{languageList[0]}</p>
            <p>{levelList[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
