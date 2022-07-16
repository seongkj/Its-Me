import React from 'react';
import Myself from './Sections/Myself';
import Stack from './Sections/Stack';
import Education from './Sections/Education';
import Project from './Sections/Project';
import Prize from './Sections/Prize';

import './Section.css';

function Section(prop) {
  const { sectionName } = prop;

  return (
    <div className="SectionComponent">
      <div className="SectionComponentTitle">
        <p>{sectionName}</p>
      </div>
      <hr className="SectionHr" />
      <div className="SectionComponentContent">
        {/* {sectionName === '한 줄 소개' ? <Myself /> : null} */}
        {/* <Myself /> */}
        {/* <Stack /> */}
        <Education />
        {/* <Project /> */}
        {/* <Prize /> */}
      </div>
      {}
    </div>
  );
}

export default Section;
