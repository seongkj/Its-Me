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

  return (
    <div className="SectionComponent">
      <div className="SectionComponentTitle">
        <p>{sectionName.name}</p>
      </div>
      <hr className="SectionHr" />
      <div className="SectionComponentContent">
        {sectionName.name === '한 줄 소개' ? <Myself /> : null}
        {sectionName.name === '보유 기술 스택' ? <Stack /> : null}
        {sectionName.name === '학력' ? <Education /> : null}
        {sectionName.name === '프로젝트/웹사이트' ? <Project /> : null}
        {sectionName.name === '수상' ? <Prize /> : null}
        {sectionName.name === '시험 및 자격증' ? <Certificate /> : null}
        {sectionName.name === '외국어' ? <Language /> : null}
        {sectionName.name === '경력' ? <Career /> : null}
        {sectionName.name === '교육 및 기타 이력' ? <EtcEducation /> : null}
      </div>
    </div>
  );
}

export default Section;
