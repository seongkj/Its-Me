import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Career.css';

function Career() {
  const { portfolio_idx } = useParams();
  const [career, setCareer] = useState([]);

  const [inputs, setInputs] = useState({
    startDate: '',
    endDate: '',
    company: '',
    position: '',
    comment: '',
  });

  const { startDate, endDate, company, position, comment } = inputs;

  //정보 불러오기
  const getCareerList = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const care = data.data.career;
        setCareer(care);
      });
  };
  useEffect(() => {
    getCareerList();
  }, []);

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
        .then((res) => getCareerList())
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

  // 삭제
  async function removeCareer(delCareer) {
    await axios
      .delete(`http://localhost:3001/careers/${delCareer.career_idx}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const deletCareer = career.filter((el) => el !== delCareer);
    setCareer(deletCareer);
  }

  function CareerList() {
    return (
      <div>
        {career?.map((el) => {
          return (
            <div key={el.career_idx} className="CareerList">
              <span>{el.start_date.substr(0, 10)} ~ </span>
              <span> {el.end_date.substr(0, 10)}</span>{' '}
              <span>회사명 : {el.company}</span>
              <span>직무 : {el.position}</span> <span>{el.comment}</span>
              <button onClick={() => removeCareer(el)} className="DeleteBtn">
                삭제
              </button>
            </div>
          );
        })}
      </div>
    );
  }

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
