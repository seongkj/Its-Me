/* eslint-disable */
import React, { useState } from 'react';
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
  const [data, setData] = useState(sectionName);
  const [sectionTitle, setSectionTitle] = useState([]);

  // 테스트 버튼
  const test = () => {
    console.log(sectionTitle);
    const qwer = sectionTitle.filter((el) => el === '한 줄 소개');
    console.log(qwer);
  };
  const test2 = () => {
    console.log(data);
  };

  return (
    <div className="Edit">
      <div className="OptionBar">
        <div className="EditBar">
          <div className="EditOption">
            <button type="button">섹션 추가</button>
          </div>
          <div className="EditOption">
            <button type="button">디자인 변경</button>
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
          <ul>
            {data.map((el) => (
              <li>
                <SectionChoiceButton
                  id={el.id}
                  name={el.name}
                  isToggle={el.isToggle}
                  sectionTitle={sectionTitle}
                  setSectionTitle={setSectionTitle}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="SectionInfo">
        {sectionTitle.map((el) => (
          <Section sectionName={el} />
        ))}
      </div>
    </div>
  );
}

// 섹션 요소 선택 버튼
function SectionChoiceButton(prop) {
  const { id, name, isToggle, sectionTitle, setSectionTitle } = prop;
  const [toggle, setToggle] = useState(isToggle);

  // 버튼 클릭 시 토글하여 색 변경, 섹션 컴포넌트 추가, 삭제
  const onChangeColor = (event) => {
    setToggle(!toggle);
    if (sectionTitle.includes(event.target.innerHTML) === false) {
      setSectionTitle([...sectionTitle, event.target.innerHTML]);
    } else {
      const deleteSection = sectionTitle.filter(
        (el) => el !== event.target.innerHTML,
      );
      setSectionTitle(deleteSection);
    }
  };
  return (
    <button
      type="button"
      id={id}
      onClick={onChangeColor}
      className={toggle ? 'SectionButton Toggle' : 'SectionButton'}
    >
      {name}
    </button>
  );
}
export default Edit;
