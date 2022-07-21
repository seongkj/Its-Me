import React, { useState } from 'react';
import CareerList from './CareerList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Career.css';

function Career() {
  const { portfolio_idx } = useParams();
  const [inputs, setInputs] = useState({
    startDate: '',
    endDate: '',
    company: '',
    position: '',
    comment: '',
  });

  const { startDate, endDate, company, position, comment } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // post
  const onCreate = () => {
    const data = {
      company: company,
      start_date: startDate,
      end_date: endDate,
      position: position,
      comment: comment,
      portfolio_idx: portfolio_idx,
    };

    if (company && startDate && position) {
      axios
        .post('http://localhost:3001/careers', data)
        .then((res) => console.log(res, '성공'))
        .catch((err) => console.log(err, '실패'));
    }
    setInputs({
      startDate: '',
      endDate: '',
      company: '',
      position: '',
      comment: '',
    });
  };

  return (
    <div className="CareerInfo">
      <div>
        <input
          type="date"
          name="startDate"
          value={startDate}
          placeholder="입사일"
          onChange={onChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          placeholder="퇴사일"
          onChange={onChange}
        />
      </div>
      <input
        type="text"
        name="company"
        value={company}
        placeholder="회사명"
        onChange={onChange}
      />
      <input
        type="text"
        name="position"
        value={position}
        placeholder="직무"
        onChange={onChange}
      />
      <input
        type="text"
        name="comment"
        value={comment}
        placeholder="비고"
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
      <CareerList />
    </div>
  );
}

export default Career;
