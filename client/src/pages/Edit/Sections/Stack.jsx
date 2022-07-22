import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import './Stack.css';

function Stack() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addstack, setAddStack] = useState('');
  const [stack, setStack] = useState([]);

  const { portfolio_idx } = useParams();

  //기술 스택 GET
  const getStack = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        setStack(res.data.data.skill);
      });
  };
  useEffect(() => {
    getStack();
  }, []);

  //기술 스택 POST
  async function postStack(data) {
    const newData = {
      name: data.name,
      portfolio_idx: portfolio_idx,
    };
    await axios
      .post('http://localhost:3001/skills', newData)
      .then((res) => {
        setStack([
          ...stack,
          { skill_idx: `${res.data.data.skill_idx}`, name: `${addstack}` },
        ]);
      })
      .catch((err) => console.log(err));
    setAddStack('');
  }

  //기술 스택 삭제
  async function removeStack(delStack) {
    await axios
      .delete(`http://localhost:3001/skills/${delStack.skill_idx}`)
      .catch((err) => console.log(err));
    const deletStack = stack.filter((el) => el !== delStack);
    setStack(deletStack);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(postStack)}>
        <input
          type="text"
          value={addstack}
          {...register('name', { required: '기술 스택을 입력하세요' })}
          placeholder="기술 스택 입력"
          onChange={(e) => setAddStack(e.target.value)}
        />
        {errors.name && <div>{errors.name.message}</div>}
        <button type="submit">등록</button>
      </form>
      <div className="StackTagList">
        {stack.map((el, i) => (
          <p key={i} className="StackTag">
            {el.name}
            <button onClick={() => removeStack(el)}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Stack;
