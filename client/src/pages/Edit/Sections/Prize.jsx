import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import PrizeList from './PrizeList';

function Prize() {
  const [inputs, setInputs] = useState({
    prizeName: '',
    prizeDate: '',
  });

  const nextId = useRef(0);
  const [state, setState] = useState('');
  const [prizes, setPrizes] = useState([]);
  const { portfolio_idx } = useParams();

  const { prizeName, prizeDate } = inputs;

  const getPrize = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const prize = data.data.award;
        setPrizes(prize);
      });
  };
  useEffect(() => {
    getPrize();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 등록
  const onCreate = (e) => {
    e.preventDefault();

    if (prizeDate === '') {
      alert('수상일을 등록해주세요');
    } else if (prizeName === '') {
      alert('수상 내역을 등록해주세요');
    } else if (prizeDate !== '' && prizeName !== '') {
      setInputs({
        prizeName: '',
        prizeDate: '',
      });
      setState('');

      nextId.current += 1;

      const data = {
        title: prizeName,
        award_date: prizeDate,
        portfolio_idx: portfolio_idx,
      };

      axios
        .post('http://localhost:3001/awards', data)
        .then((res) => getPrize())
        .catch((err) => console.log(err, '실패'));
    }
  };

  // 삭제
  async function removePrize(delPrize) {
    await axios
      .delete(`http://localhost:3001/awards/${delPrize.award_idx}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const deletPrize = prizes.filter((el) => el !== delPrize);
    setPrizes(deletPrize);
  }

  //목록
  function PrizeList() {
    return (
      <div>
        {prizes?.map((e) => {
          return (
            <div key={e.award_idx}>
              <span>{e.award_date.substr(0, 10)}</span> <span>{e.title}</span>
              <button onClick={() => removePrize(e)}>삭제</button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="PrizeWrap">
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
      </div>
      <PrizeList />
    </div>
  );
}

export default Prize;
