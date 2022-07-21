import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EtcEducationList = () => {
  const { portfolio_idx } = useParams();
  const [etcEducationList, setEtcEducationList] = useState([]);

  // get
  const getEtcEducationList = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        console.log(res), '성공';
        setEtcEducationList(res.data.data.etc_education);
      })
      .catch((err) => console.log(err), '실패');
  };
  useEffect(() => {
    getEtcEducationList();
  }, []);

  // delete
  const onRemove = async (id) => {
    await axios
      .delete(`http://localhost:3001/etc_educations/${id}`)
      .then((res) => {
        getEtcEducationList();
      });
  };

  return (
    <div>
      {etcEducationList.map((etc_education) => (
        <EtcEducation
          etc_education={etc_education}
          key={etc_education.etc_education_idx}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
const EtcEducation = ({ etc_education, onRemove }) => {
  return (
    <div>
      <span>{etc_education.start_date}</span>{' '}
      <span>{etc_education.end_date}</span>{' '}
      <span>{etc_education.organization}</span>{' '}
      <span>{etc_education.title}</span> <span>{etc_education.comment}</span>
      <button onClick={() => onRemove(etc_education.etc_education_idx)}>
        삭제
      </button>
    </div>
  );
};
export default EtcEducationList;
