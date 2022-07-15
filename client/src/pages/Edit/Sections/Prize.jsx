import React from 'react';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './Prize.css';
import PrizeList from './PrizeList';

function Prize() {
  const [inputs, setInputs] = useState({
    prizeName: '',
    prizeDate: '',
  });

  const { prizeName, prizeDate } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [prizes, setPrizes] = useState([
    {
      id: 1,
      prizeName: '',
      prizeDate: '',
    },
  ]);

  const nextId = useRef(0);

  // 등록
  const onCreate = () => {
    const prize = {
      id: nextId.current,
      prizeName,
      prizeDate,
    };
    setPrizes(prizes.concat(prize));

    setInputs({
      prizeName: '',
      prizeDate: '',
    });
    nextId.current += 1;
  };

  // 삭제
  const onRemove = id => {
    setPrizes(prizes.filter(prize => prize.id !== id));
  };

  return (
    <div>
      <input
        type="date"
        name="prizeDate"
        value={prizeDate}
        placeholder="수상일"
        onChange={onChange}
      />
      <input
        type="text"
        name="prizeName"
        value={prizeName}
        placeholder="수상 내역 입력"
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
      <PrizeList prizes={prizes} onRemove={onRemove} />
    </div>
  );
}

export default Prize;