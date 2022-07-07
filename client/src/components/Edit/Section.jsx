import React from 'react';

import '../../pages/Section.css';

function Section(prop) {
  const { sectionName } = prop;
  return (
    <div className="section-component">
      <div className="section-component-title">
        <p>{sectionName}</p>
      </div>
      <hr className="section-hr" />
      <div className="section-component-content">
        <p>{sectionName} input, 내용</p>
      </div>
    </div>
  );
}

export default Section;
