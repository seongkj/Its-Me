import React from 'react';
import styled from 'styled-components';

function Day(){

  return(
    <DayWrap>
      <p>데이모드 입니다.</p>
      <p>배경이 흰색이고 텍스트는 검은색입니다.</p>
    </DayWrap>
  )
}

const DayWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
`

export default Day;