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
  const [sectionTitle, setSectionTitle] = useState(sectionName);
  const [sectionButton, setSectionButton] = useState([]);

  // 테스트 버튼
  const test = () => {
    console.log(sectionButton);
    const qwer = sectionButton.filter((el) => el === '한 줄 소개');
    console.log(qwer);
  };
  const test2 = () => {
    console.log(sectionTitle);
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
            {sectionTitle.map((el) => (
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
        </div>
        <div className="edit-option">
          <button type="button" onClick={test2}>
            테스트버튼2
          </button>
        </div>
      </div>
      <div className="section-bar">
        <ul>
          {/* fixme data는 변수의 이름으로 사용하기에는 너무 포괄적인 이름입니다. 다른 개발자가 봤을때에도 어떤 목적으로 선언한 데이터인지 알 수 있게끔 선언하는것이 좋습니다. */}
          {data.map((el, index) => (
            // fixme 리스트를 순환해서 컴포넌트를 리턴할 때에는 해당 컴포넌트에 key를 설정해주어야 합니다. 참고(https://ko.reactjs.org/docs/lists-and-keys.html)
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
      <div className="section-info">
        {sectionTitle.map((el) => (
          // fixme 리스트를 순환해서 컴포넌트를 리턴할 때에는 해당 컴포넌트에 key를 설정해주어야 합니다. 참고(https://ko.reactjs.org/docs/lists-and-keys.html)
          <Section sectionName={el} />
        ))}
      </div>
    </div>
  );
}

// 섹션 요소 선택 버튼
function SectionChoiceButton(prop) {
  const { id, name, isToggle, sectionTitle, setSectionTitle } = prop;
  // fixme toggle은 Button의 색을 어떻게 보여줄지 구분하기 위한 변수로 쓰이지만 이름만 봤을때 무엇을 위한 변수인지 알 수 없습니다. clicked와 같은 변수명은 어떨까요?
  const [toggle, setToggle] = useState(isToggle);

  // 버튼 클릭 시 토글하여 색 변경, 섹션 컴포넌트 추가, 삭제
  /*
  fixme 해당 함수는 색을 바꾸는 로직, 화면에 리스트를 추가하는 두가지 로직을 가지고 있습니다. 하지만 네이밍은 색만 바꿀거처럼 인식됩니다. 예시와 같이 함수가 하나의 로직만 처리할 수 있도록 쪼개고 네이밍을 명확히 해주면 인식하기 쉽습니다.
  const changeColor = () => {
    setToggle(!toggle);
  }

  const addSectionTitle = (clickedTitle) => {
    setSectionTitle([...sectionTitle, clickedTitle]);
  }

  const removeSectionTitle = (clickedTitle) => {
    const deleteSection = sectionTitle.filter(
        (el) => el !== clickedTitle,
    );
    setSectionTitle(deleteSection);
  }

  const onChangeColor = (event) => {
    changeColor();
    if (sectionTitle.includes(event.target.innerHTML) === false) {
      addSectionTitle();
    } else {
      removeSectionTitle();
    }
   */

  const onChangeColor = (event) => {
    changeColor();
    if (sectionButton.includes(event.target.innerHTML) === false) {
      addSectionTitle(event.target.innerHTML);
    } else {
      const deleteSection = sectionTitle.filter(
          (el) => el !== clickedTitle,
      );
      setSectionTitle(deleteSection);
    }
  };

  return (
    <button
      type="button"
      id={id}
      onClick={onChangeColor}
      // className={toggle ? 'section-button toggle' : 'section-button'}
      className={toggle ? 'section-button toggle' : 'section-button'}
    >
      {name}
    </button>
  );
}
export default Edit;
