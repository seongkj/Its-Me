/* eslint-disable */
import React, { useState, useReducer } from 'react';
import Section from './Section';

import './Edit.css';

// 포트폴리오 섹션 정보
const sectionName = [
  { id: 1, name: '한 줄 소개', isToggle: false },
  { id: 2, name: '보유 기술 스택', isToggle: false },
  { id: 3, name: '경력', isToggle: false },
  { id: 4, name: '학력', isToggle: false },
  { id: 5, name: '교육 및 기타 이력', isToggle: false },
  { id: 6, name: '프로젝트', isToggle: false },
  { id: 7, name: '수상', isToggle: false },
  { id: 8, name: '시험 및 자격증', isToggle: false },
  { id: 9, name: '외국어', isToggle: false },
  { id: 10, name: '포트폴리오/웹사이트', isToggle: false },
];

function Edit() {
  const [sections, setSections] = useState(sectionName);
  const [sectionButton, setSectionButton] = useState([]);
  const [editChoice, setEditChoice] = useState(true);

  const [designs, setDesigns] = useState([1, 2]);

  const [display, toggleDisplay] = useReducer(
    (val) => (val === 'flex' ? 'none' : 'flex'),
    'flex',
  );

  // 테스트 버튼
  const test = () => {
    console.log(sectionButton);
    console.log(sectionName.includes());
  };

  return (
    <div className="Edit">
      <div className="OptionBar">
        <div className="EditBar">
          <div className="EditOption">
            <button type="button" onClick={() => changeSection(setEditChoice)}>
              섹션 변경
            </button>
          </div>
          <div className="EditOption">
            <button type="button" onClick={() => changeDesign(setEditChoice)}>
              디자인 변경
            </button>
          </div>
          <div className="EditOption">
            <button type="button" onClick={toggleDisplay}>
              테스트버튼
            </button>
          </div>
          <div className="EditOption" style={{ display }}>
            <button type="button">테스트버튼2</button>
          </div>
        </div>
        <div className="SectionBar">
          {editChoice ? (
            <ul style={{ display }}>
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
          ) : (
            <ul>
              {designs.map((el) => (
                <li>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {editChoice ? (
        <div className="SectionInfo" style={{ display }}>
          {sectionButton.map((el, i) => (
            <Section sectionName={el} key={i} />
          ))}
          <button>전체 POST</button>
        </div>
      ) : null}
    </div>
  );
}

// 섹션 요소 선택 버튼
function SectionChoiceButton(prop) {
  const { id, name, isToggle, sectionButton, setSectionButton } = prop;
  const [clicked, setClicked] = useState(isToggle);

  // 버튼 클릭 시 토글하여 색 변경, 섹션 컴포넌트 추가, 삭제
  const changeColor = () => {
    setClicked(!clicked);
  };
  const addSectionTitle = (clickedTitle) => {
    setSectionButton([...sectionButton, clickedTitle]);
  };
  const removeSectionTitle = (clickedTitle) => {
    const deleteSection = sectionButton.filter((el) => el !== clickedTitle);
    setSectionButton(deleteSection);
  };

  const onChangeColor = (event) => {
    changeColor();
    if (sectionButton.includes(event.target.innerHTML) === false) {
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
function changeSection(setEditChoice) {
  setEditChoice(true);
}
//디자인 변경
function changeDesign(setEditChoice) {
  setEditChoice(false);
}

export default Edit;
