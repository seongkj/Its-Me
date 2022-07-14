import React from 'react';
import Myself from './Sections/Myself';
import Stack from './Sections/Stack';
import Education from './Sections/Education';

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
        {/* <Myself /> */}
        {/* <Stack /> */}
        <Education />
      </div>
    </div>
  );
}

export default Section;
