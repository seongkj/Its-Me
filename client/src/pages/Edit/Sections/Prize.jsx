import React from 'react';
import { useState, useRef } from 'react';
import PrizeList from './PrizeList';
import axios from 'axios';

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

  const [prizes, setPrizes] = useState([]);

  const nextId = useRef(0);

  // 등록
  const onCreate = () => {
    const prize = {
      id: nextId.current,
      prizeName,
      prizeDate,
    };

    if (prizeDate === '') {
      alert('수상일을 등록해주세요');
    } else if (prizeName === '') {
      alert('수상 내역을 등록해주세요');
    } else if (prizeDate !== '' && prizeName !== '') {
      setPrizes(prizes.concat(prize));

      const data = {
        title: prizeName,
        award_date: prizeDate,
        portfolio_idx: 1,
      };

      if (prizeName && prizeDate) {
        axios
          .post('http://localhost:3001/awards', data)
          .then((res) => console.log(res, '성공'))
          .catch((err) => console.log(err, '실패'));
      }

      setInputs({
        prizeName: '',
        prizeDate: '',
      });
      nextId.current += 1;
    }
  };

  // 삭제
  const onRemove = (id) => {
    setPrizes(prizes.filter((prize) => prize.id !== id));
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
