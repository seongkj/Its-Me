import React, { useState, useReducer, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';

import Section from './Section';
import Design from './Design';

import { getPortfolio, sectionName, designName } from '../../utils/api';

import './Edit.css';

// 포트폴리오 섹션 정보

function Edit() {

  const [theme, setTheme] = useState('first-theme');

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

  const [sections, setSections] = useState(sectionName);
  const [designs, setDesigns] = useState(designName);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [sectionButton, setSectionButton] = useState([]);
  const [designButton, setDesignButton] = useState([]);

  const [displaySection, setDisplaySection] = useState({ display: 'flex' });
  const [displayDesign, setDisplayDesign] = useState({ display: 'none' });

  const { portfolio_idx } = useParams();

  // 포트폴리오 GET (포폴을 수정할 때 기존에 사용했던 세션을 미리 열어두기 위함)
  const getPofol = () => {
    const getData = [];
    getPortfolio(portfolio_idx).then((res) => {
      if (res.introduce.length > 0) {
        getData.push(sections[0]);
      }
      if (res.skill.length > 0) {
        getData.push(sections[1]);
      }
      if (res.career.length > 0) {
        getData.push(sections[2]);
      }
      if (res.education.length > 0) {
        getData.push(sections[3]);
      }
      if (res.website.length > 0) {
        getData.push(sections[4]);
      }
      if (res.etc_education.length > 0) {
        getData.push(sections[5]);
      }
      if (res.award.length > 0) {
        getData.push(sections[6]);
      }
      if (res.certificate.length > 0) {
        getData.push(sections[7]);
      }
      if (res.language.length > 0) {
        getData.push(sections[8]);
      }
      setSectionButton(getData);
    });
  };

  const onClickTempButton = (index) => {
    setClickedButtonIndex(index);
  }

  useEffect(() => {
    getPofol();
  }, []);

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
                element={<themes onClick={changeTheme}/>}
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
  const { index, clickedButtonIndex, id, name, isToggle, designButton, setDesignButton, onClick } = prop;


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
      className={index === clickedButtonIndex ? 'DesignButton Toggle' : 'DesignButton'}
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
