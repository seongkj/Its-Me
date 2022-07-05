import React, { useState } from 'react';
import Section from './Section';

import '../../pages/Edit.css';

function Edit() {
  const componentName = [
    '한 줄 소개',
    '보유 기술 스택',
    '경력',
    '학력',
    '교육 및 기타 이력',
    '프로젝트',
    '수상',
    '시험 및 자격증',
    '외국어',
    '포트폴리오/웹사이트',
  ];
  const addComponent = (event) => {
    console.log(`${event.target.innerHTML} 컴포넌트 추가`);
  };
  return (
    <div className="edit">
      <div className="edit-bar">섹션, 디자인 선택 바</div>
      <div className="section-bar">
        <ul>
          {componentName.map((el) => (
            <li>
              <button type="submit" onClick={addComponent}>
                {el}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="section-info">
        <Section />
      </div>
    </div>
  );
}

export default Edit;
