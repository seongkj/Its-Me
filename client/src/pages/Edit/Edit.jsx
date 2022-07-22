import React, { useState, useReducer, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import axios from 'axios';

import Section from './Section';
import Design from './Design';

import { getPortfolio, sectionName, designName } from '../../utils/api';

import './Edit.css';

// 포트폴리오 섹션 정보

function Edit() {
  const [theme, setTheme] = useState('day-theme');

  const changeTheme = (theme) => {
    console.log('changeTheme----------', theme);
    setTheme(theme);
  };

  const setThemeToLocalStorage = (theme) => {
    window.localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    setThemeToLocalStorage(theme);
    console.log('setThemeToLocalStorage----------', theme);
  }, [theme]);

  const getThemeToLocalStorage = () => window.localStorage.getItem('theme');
  const getUserIdx = window.localStorage.getItem('userIdx');
  const getToken = window.localStorage.getItem('token');

  const [sections, setSections] = useState(sectionName);
  const [designs, setDesigns] = useState(designName);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [sectionButton, setSectionButton] = useState([]);
  const [designButton, setDesignButton] = useState([]);
  const [userPortTitle, setUserPortTitle] = useState('');

  const [displaySection, setDisplaySection] = useState({ display: 'flex' });
  const [displayDesign, setDisplayDesign] = useState({ display: 'none' });

  const { portfolio_idx } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/portfolios`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const datas = res.data.data;
        datas.forEach((e) => {
          if (e.portfolio_idx === Number(portfolio_idx)) {
            setUserPortTitle(e.title);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // 포트폴리오 GET (포폴을 수정할 때 기존에 사용했던 세션을 미리 열어두기 위함)
  const getPofol = () => {
    const getData = [];
    const toggleData = [];
    getPortfolio(portfolio_idx).then((res) => {
      if (res.introduce.length > 0) {
        getData.push(sectionName[0]);
        toggleData.push({ id: 1, name: '한 줄 소개', isToggle: true });
      } else {
        toggleData.push({ id: 1, name: '한 줄 소개', isToggle: false });
      }
      if (res.skill.length > 0) {
        getData.push(sectionName[1]);
        toggleData.push({ id: 2, name: '보유 기술 스택', isToggle: true });
      } else {
        toggleData.push({ id: 2, name: '보유 기술 스택', isToggle: false });
      }
      if (res.career.length > 0) {
        getData.push(sectionName[2]);
        toggleData.push({ id: 3, name: '경력', isToggle: true });
      } else {
        toggleData.push({ id: 3, name: '경력', isToggle: false });
      }
      if (res.education.length > 0) {
        getData.push(sectionName[3]);
        toggleData.push({ id: 4, name: '학력', isToggle: true });
      } else {
        toggleData.push({ id: 4, name: '학력', isToggle: false });
      }
      if (res.website.length > 0) {
        getData.push(sectionName[4]);
        toggleData.push({ id: 5, name: '프로젝트/웹사이트', isToggle: true });
      } else {
        toggleData.push({ id: 5, name: '프로젝트/웹사이트', isToggle: false });
      }
      if (res.etc_education.length > 0) {
        getData.push(sectionName[5]);
        toggleData.push({ id: 6, name: '교육 및 기타 이력', isToggle: true });
      } else {
        toggleData.push({ id: 6, name: '교육 및 기타 이력', isToggle: false });
      }
      if (res.award.length > 0) {
        getData.push(sectionName[6]);
        toggleData.push({ id: 7, name: '수상', isToggle: true });
      } else {
        toggleData.push({ id: 7, name: '수상', isToggle: false });
      }
      if (res.certificate.length > 0) {
        getData.push(sectionName[7]);
        toggleData.push({ id: 8, name: '시험 및 자격증', isToggle: true });
      } else {
        toggleData.push({ id: 8, name: '시험 및 자격증', isToggle: false });
      }
      if (res.language.length > 0) {
        getData.push(sectionName[8]);
        toggleData.push({ id: 9, name: '외국어', isToggle: true });
      } else {
        toggleData.push({ id: 9, name: '외국어', isToggle: false });
      }
      setSectionButton(getData);
      setSections(toggleData);
    });
  };
  useEffect(() => {
    getPofol();
  }, []);

  const onClickTempButton = (index) => {
    setClickedButtonIndex(index);
    if (index === 1) {
      axios
        .patch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
          template: 1,
          title: userPortTitle,
          user_idx: getUserIdx,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      alert('다크 모드 템플릿이 적용되었습니다.');
    } else {
      axios
        .patch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
          template: 0,
          title: userPortTitle,
          user_idx: getUserIdx,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      alert('일반 모드 템플릿이 적용되었습니다.');
    }
  };

  return (
    <div className={getThemeToLocalStorage()}>
      <Header />
      <div className="Edit">
        <div className="OptionBar">
          <div className="EditBar">
            <div className="EditOption">
              <button
                type="button"
                onClick={() =>
                  changeSection(setDisplaySection, setDisplayDesign)
                }
                className="FirstBtn Toggle"
              >
                항목
              </button>
            </div>
            <div className="EditOption">
              <button
                type="button"
                onClick={() =>
                  changeDesign(setDisplaySection, setDisplayDesign)
                }
                className="SecBtn"
                element={<themes onClick={changeTheme} />}
              >
                템플릿
              </button>
            </div>
          </div>
          <div className="SectionBar">
            <ul style={displaySection}>
              {sections.map((el) => (
                <li key={el.id}>
                  <SectionChoiceButton
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    isToggle={el.isToggle}
                    sectionButton={sectionButton}
                    setSectionButton={setSectionButton}
                  />
                </li>
              ))}
            </ul>
            <div className="DesignBar">
              <ul style={displayDesign}>
                {/* <li className="DayBtn ThemeBtn" key="keyDay" onClick={checkTheme}>
                  <img src="https://lingopolo.org/thai/sites/lingopolo.org.thai/files/styles/entry/public/images/2016/08/29/day-landscape-664923_1920.jpg" />
                </li>
                <li className="NightBtn ThemeBtn" key="keyNight">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg/640px-%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg" />
                </li> */}
                {designs.map((el, i) => (
                  <li key={i}>
                    <DesignChoiceButton
                      index={i}
                      key={el.id}
                      id={el.id}
                      name={el.name}
                      isToggle={el.isToggle}
                      clickedButtonIndex={clickedButtonIndex}
                      designButton={designButton}
                      setDesignButton={setDesignButton}
                      onClick={onClickTempButton}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="SectionInfo">
        {sectionButton.map((el, i) => (
          <Section sectionName={el} key={i} />
        ))}
        <Link to="/mypage">
          <button
            onClick={() =>
              window.open(
                `http://localhost:3000/PdfComponent/${portfolio_idx}`,
                '_blank',
              )
            }
          >
            완료
          </button>
        </Link>
      </div>

      <div className="DesignInfo" style={displayDesign}>
        {designButton.map((el, i) => (
          <Design designName={el} key={i} />
        ))}
      </div>
    </div>
  );
}

// 섹션 요소 선택 버튼
function SectionChoiceButton(prop) {
  const { id, name, isToggle, sectionButton, setSectionButton } = prop;
  const [clicked, setClicked] = useState(isToggle);

  // 버튼 클릭 시 토글하여 색 변경, 섹션 컴포넌트 추가, 삭제
  const changeColor = () => setClicked(!clicked);

  //세션 컴포넌트 추가
  const addSectionTitle = (clickedTitle) => {
    const sortData = [...sectionButton, { id: id, name: clickedTitle }];
    sortData.sort((a, b) => a.id - b.id);
    setSectionButton(sortData);
  };

  //세션 컴포넌트 삭제
  const removeSectionTitle = (clickedTitle) => {
    const deleteSection = sectionButton.filter(
      (el) => el.name !== clickedTitle,
    );
    setSectionButton(deleteSection);
  };

  //섹션 요소 클릭 함수
  const onChangeColor = (event) => {
    const check = sectionButton.filter(
      (el) => el.name === event.target.innerHTML,
    );

    changeColor();

    if (check.length !== 1) {
      addSectionTitle(event.target.innerHTML);
    } else {
      removeSectionTitle(event.target.innerHTML);
    }
  };

  return (
    <button
      type="button"
      id={id}
      onClick={onChangeColor}
      className={clicked ? 'SectionButton Toggle' : 'SectionButton'}
    >
      {name}
    </button>
  );
}

// 디자인 요소 선택 버튼
function DesignChoiceButton(prop) {
  const {
    index,
    clickedButtonIndex,
    id,
    name,
    isToggle,
    designButton,
    setDesignButton,
    onClick,
  } = prop;

  const addDesign = (clickedTitle) => {
    const sortData = [{ id: id, name: clickedTitle }];
    setDesignButton(sortData);
  };

  const removeDesign = (clickedTitle) => {
    const deleteDesign = designButton.filter((el) => el.name !== clickedTitle);
    setDesignButton(deleteDesign);
  };

  const onChangeColor = (event) => {
    onClick(index);
    const check = designButton.filter(
      (el) => el.name === event.target.innerHTML,
    );

    if (check.length !== 1) {
      addDesign(event.target.innerHTML);
    } else {
      removeDesign(event.target.innerHTML);
    }
  };

  return (
    <button
      type="button"
      id={id}
      onClick={onChangeColor}
      className={
        index === clickedButtonIndex ? 'DesignButton Toggle' : 'DesignButton'
      }
    >
      {name}
    </button>
  );
}

//섹션 변경
function changeSection(setDisplaySection, setDisplayDesign) {
  setDisplaySection({ display: 'flex' });
  setDisplayDesign({ display: 'none' });
  const firstBtn = document.querySelector('.FirstBtn');
  const secBtn = document.querySelector('.SecBtn');
  firstBtn.classList.add('Toggle');
  secBtn.classList.remove('Toggle');
}
//디자인 변경
function changeDesign(setDisplaySection, setDisplayDesign) {
  setDisplaySection({ display: 'none' });
  setDisplayDesign({ display: 'flex' });
  const firstBtn = document.querySelector('.FirstBtn');
  const secBtn = document.querySelector('.SecBtn');
  firstBtn.classList.remove('Toggle');
  secBtn.classList.add('Toggle');
}

export default Edit;
