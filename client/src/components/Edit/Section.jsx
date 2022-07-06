import React from 'react';

import '../../pages/Section.css';

function Section(prop) {
  const { sectionName } = prop;
  return (
    <div className="section-component">
      <div className="section-component-title">
        <p>세션 컴포넌트 제목(ex : 한 줄 소개)</p>
      </div>
      <hr className="section-hr" />
      <div className="section-component-content">
        <p>세션 컴포넌트 input, 내용</p>
      </div>
    </div>
  );
}

export default Section;
