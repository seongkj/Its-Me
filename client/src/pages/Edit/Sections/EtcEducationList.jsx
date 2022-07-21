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
    <div className="EtcEduList">
      <div>
        <span>{etc_education.start_date.substr(0, 10)} ~ </span>{' '}
        <span>{etc_education.end_date.substr(0, 10)}</span>{' '}
      </div>
      <p>기관 : {etc_education.organization}</p>{' '}
      <p>활동명: {etc_education.title}</p> <p>{etc_education.comment}</p>
      <button
        onClick={() => onRemove(etc_education.etc_education_idx)}
        className="DeleteBtn"
      >
        삭제
      </button>
    </div>
  );
};
export default EtcEducationList;
