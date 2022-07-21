import React, { useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Section from './Section';

import {
  getPortfolio,
  getPortfolios,
  postPortfolios,
  deletePortfolios,
} from '../../utils/api';

import './Edit.css';

// 포트폴리오 섹션 정보
const sectionName = [
  { id: 1, name: '한 줄 소개', isToggle: false },
  { id: 2, name: '보유 기술 스택', isToggle: false },
  { id: 3, name: '경력', isToggle: false },
  { id: 4, name: '학력', isToggle: false },
  { id: 5, name: '프로젝트/웹사이트', isToggle: false },
  { id: 6, name: '교육 및 기타 이력', isToggle: false },
  { id: 7, name: '수상', isToggle: false },
  { id: 8, name: '시험 및 자격증', isToggle: false },
  { id: 9, name: '외국어', isToggle: false },
];

function Edit() {
  const [sections, setSections] = useState(sectionName);
  const [designs, setDesigns] = useState([1, 2]);

  const [sectionButton, setSectionButton] = useState([]);

  const [displaySection, setDisplaySection] = useState({ display: 'flex' });
  const [displayDesign, setDisplayDesign] = useState({ display: 'none' });

  // 테스트 버튼
  const test = async () => {
    getPortfolio(1).then((res) => console.log(res));
  };

  const test2 = () => {
    // console.log(sectionButton);
    getPortfolios().then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="Edit">
      <div className="OptionBar">
        <div className="EditBar">
          <div className="EditOption">
            <button
              type="button"
              onClick={() => changeSection(setDisplaySection, setDisplayDesign)}
            >
              섹션 변경
            </button>
          </div>
          <div className="EditOption">
            <button
              type="button"
              onClick={() => changeDesign(setDisplaySection, setDisplayDesign)}
            >
              디자인 변경
            </button>
          </div>
          <div className="EditOption">
            <button type="button" onClick={test}>
              테스트버튼
            </button>
          </div>
          <div className="EditOption">
            <button type="button" onClick={test2}>
              테스트버튼2
            </button>
          </div>
        </div>

        <div className="SectionBar">
          <ul style={displaySection}>
            {sections.map((el) => (
              <li>
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

          <ul style={displayDesign}>
            {designs.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="SectionInfo" style={displaySection}>
        {sectionButton.map((el, i) => (
          <Section sectionName={el} key={i} />
        ))}

        <Link to="/mypage">
          <button
            onClick={() =>
              window.open('http://localhost:3000/PdfComponent', '_blank')
            }
          >
            완료
          </button>
        </Link>
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

//섹션 변경
function changeSection(setDisplaySection, setDisplayDesign) {
  setDisplaySection({ display: 'flex' });
  setDisplayDesign({ display: 'none' });
}
//디자인 변경
function changeDesign(setDisplaySection, setDisplayDesign) {
  setDisplaySection({ display: 'none' });
  setDisplayDesign({ display: 'flex' });
}

export default Edit;
