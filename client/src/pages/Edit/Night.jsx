import React from 'react';
import styled from 'styled-components';

function Night(){

  return(
    <NightWrap>
      <p>다크 모드입니다.</p>
      <p>배경은 검은색이고 텍스트는 흰색입니다.</p>
    </NightWrap>
  )
}

const NightWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  color: white;
`

export default Night;