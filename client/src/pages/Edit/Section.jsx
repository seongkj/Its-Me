import React, { useState, useReducer } from 'react';
import Myself from './Sections/Myself';
import Stack from './Sections/Stack';
import Education from './Sections/Education';
import Project from './Sections/Project';
import Prize from './Sections/Prize';
import Certificate from './Sections/Certificate';
import Language from './Sections/Language';
import Career from './Sections/Career';
import EtcEducation from './Sections/EtcEducation';

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
        {sectionName === '프로젝트/웹사이트' ? <Project /> : null}
        {sectionName === '수상' ? <Prize /> : null}
        {sectionName === '시험 및 자격증' ? <Certificate /> : null}
        {sectionName === '외국어' ? <Language /> : null}
        {sectionName === '경력' ? <Career /> : null}
        {sectionName === '교육 및 기타 이력' ? <EtcEducation /> : null}
      </div>
    </div>
  );
}

export default Section;
