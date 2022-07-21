import React from 'react';
import './Portfolio.css';

class Portfolio extends React.Component {
  render() {
    return (
      <div className="PortfolioWrap">
        <div className="PortUserInfo">
          <div className="PortImgWrap">
            {/* <img src={userImg} alt="" /> */}
          </div>
          <div className="PortTxtWrap">
            <p>박세령 </p>
            <p>1999.08.16 </p>
            <p>qkrtpfud816@gmail.com </p>
            <p>010-1111-1111 </p>
          </div>
        </div>
        <hr className="MainHr"></hr>
        <div className="PortEduInfo">
          <p className="PortMainTxt">학력사항</p>
          <div className="PortTxtWrap2">
            <p>ddd대학교</p>
            <p>ddd고등학교</p>
          </div>
        </div>
        <hr className="MainHr"></hr>
        <div className="PortEduInfo">
          <p className="PortMainTxt">자격정보</p>
          <div className="PortTxtWrap2">
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>자격증1</p>
            </div>
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>자격증2</p>
            </div>
          </div>
        </div>
        <hr className="MainHr"></hr>
        <div className="PortEduInfo">
          <p className="PortMainTxt">수상내역</p>
          <div className="PortTxtWrap2">
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>수상1</p>
            </div>
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>수상2</p>
            </div>
          </div>
        </div>
        <hr className="MainHr"></hr>
        <div className="PortEduInfo">
          <p className="PortMainTxt">경력사항</p>
          <div className="PortTxtWrap2">
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>수상1</p>
              <p>포지션</p>
            </div>
            <div className="PortTxtWrap3">
              <p>22.07.15</p>
              <p>수상2</p>
              <p>포지션</p>
            </div>
          </div>
        </div>
        <hr className="MainHr"></hr>
        <div className="PortEduInfo">
          <p className="PortMainTxt">프로그램/툴 숙련도</p>
          <div className="DashBoard">
            <div className="DashWrap">
              <svg className="DashBoardSvg">
                <circle className="bg" cx="57" cy="57" r="52" />
                <circle className="meter-1" cx="57" cy="57" r="52" />
              </svg>
              <p className="DashTxt">툴1</p>
            </div>
            <div className="DashWrap">
              <svg className="DashBoardSvg">
                <circle className="bg" cx="57" cy="57" r="52" />
                <circle className="meter-2" cx="57" cy="57" r="52" />
              </svg>
              <p className="DashTxt">툴2</p>
            </div>
            <div className="DashWrap">
              <svg className="DashBoardSvg">
                <circle className="bg" cx="57" cy="57" r="52" />
                <circle className="meter-3" cx="57" cy="57" r="52" />
              </svg>
              <p className="DashTxt">툴3</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
