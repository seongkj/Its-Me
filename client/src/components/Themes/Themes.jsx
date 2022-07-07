import React, { useState, useEffect, useRef } from 'react';
import '../../pages/Themes.css';

const Themes = () => {
  return (
    <div className="ThemesWrap">
      <h1>디자인을 선택하세요.</h1>
      <div className="Themes">
        <a href="/" className="theme1">
          <img src="https://images.template.net/wp-content/uploads/2017/04/Design-Portfolio-Template.jpg" />
          <span>THEME 1</span>
        </a>
        <a href="/" className="theme2">
          <img src="https://images.template.net/wp-content/uploads/2017/04/Design-Portfolio-Template.jpg" />
          <span>THEME 2</span>
        </a>
      </div>
    </div>
  );
};

export default Themes;
