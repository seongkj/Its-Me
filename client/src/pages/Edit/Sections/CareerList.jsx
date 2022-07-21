import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CareerList = () => {
  const { portfolio_idx } = useParams();
  const [careerList, setCareerList] = useState([]);

  // get
  const getCareerList = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        console.log(res), '성공';
        setCareerList(res.data.data.career);
      })
      .catch((err) => console.log(err), '실패');
  };
  useEffect(() => {
    getCareerList();
  }, []);

  // delete
  const onRemove = async (id) => {
    await axios.delete(`http://localhost:3001/careers/${id}`).then((res) => {
      getCareerList();
    });
  };

  return (
    <div>
      {careerList.map((career) => (
        <Career career={career} key={career.career_idx} onRemove={onRemove} />
      ))}
    </div>
  );
};

const Career = ({ career, onRemove }) => {
  return (
    <div>
      <span>{career.start_date}</span>
      <span>{career.end_date}</span> <span>{career.company}</span>
      <span>{career.position}</span> <span>{career.comment}</span>
      <button onClick={() => onRemove(career.career_idx)}>삭제</button>
    </div>
  );
};

export default CareerList;
