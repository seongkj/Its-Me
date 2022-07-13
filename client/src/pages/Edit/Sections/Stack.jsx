import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import './Stack.css';

function Stack() {
  const [addstack, setAddStack] = useState('');
  const [stack, setStack] = useState([]);

  //기술 스택 등록
  const addStack = (e) => {
    e.preventDefault();
    setStack([...stack, addstack]);
    setAddStack('');
  };
  //기술 스택 삭제
  const removeStack = (delStack) => {
    const deletStack = stack.filter((el) => el !== delStack);
    setStack(deletStack);
  };

  return (
    <div>
      <form onSubmit={addStack}>
        <input
          type="text"
          value={addstack}
          placeholder="기술 스택 입력"
          onChange={(e) => setAddStack(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
      <div className="StackTagList">
        {stack.map((el, i) => {
          return (
            <p key={i} className="StackTag">
              {el}
              <button onClick={() => removeStack(el)}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Stack;
