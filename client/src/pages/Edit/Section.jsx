import React from 'react';

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
        <form>
          <textarea></textarea>
        </form>
      </div>
    </div>
  );
}

export default Section;
