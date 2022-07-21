import React from 'react';

import Day from './Day'
import Night from './Night';
import './Section.css';

function Design(prop) {
  const { designName } = prop;

  return (
    <div className="DesignComponent">
      <div className="DesignComponentTitle">
        <p>{designName.name}</p>
      </div>
      <hr className="DesignHr" />
      <div className="DesignComponentContent">
        {designName.name === '일반 모드' ? <Day /> : null}
        {designName.name === '다크 모드' ? <Night /> : null}
      </div>
    </div>
  );
}

export default Design;
