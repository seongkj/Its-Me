import React, { useState, useReducer } from 'react';
import Myself from './Sections/Myself';
import Stack from './Sections/Stack';
import Education from './Sections/Education';
import Project from './Sections/Project';
import Prize from './Sections/Prize';

import './Section.css';

function Section(prop) {
  const { sectionName } = prop;

  const [displaySection, setDisplaySection] = useState({ display: 'block' });
  const [display, toggleDisplay] = useReducer(
    (val) => (val === 'block' ? 'none' : 'block'),
    'block',
  );

  return (
    <div className="SectionComponent">
      <div className="SectionComponentTitle">
        <p>{sectionName}</p>
      </div>
      <hr className="SectionHr" />
      <div className="SectionComponentContent">
        {sectionName === '한 줄 소개' ? <Myself /> : null}
        {sectionName === '보유 기술 스택' ? <Stack /> : null}
        {sectionName === '학력' ? <Education /> : null}
        {sectionName === '프로젝트' ? <Project /> : null}
        {sectionName === '수상' ? <Prize /> : null}
      </div>
    </div>
  );
}

export default Section;
