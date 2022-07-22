import React from 'react';
import styled from 'styled-components';
import pdf_dark from '../../../src/assets/img/pdf_다크모드.png';

function Night() {
  return (
    <NightWrap>
      <p>다크 모드입니다.</p>
      <p>배경은 검은색이고 텍스트는 흰색입니다.</p>
      <img src={pdf_dark} />
    </NightWrap>
  );
}

const NightWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
`;

export default Night;
