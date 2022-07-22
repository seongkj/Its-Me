import React, { useState, useEffect } from 'react';
import EtcEducationList from './EtcEducationList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EtcEducationList.css';

function EtcEducation() {
  const { portfolio_idx } = useParams();
  const [etcEdu, setEtcEdu] = useState([]);

  const [inputs, setInputs] = useState({
    openDate: '',
    closeDate: '',
    title: '',
    organization: '',
    note: '',
  });

  const { openDate, closeDate, title, organization, note } = inputs;

  // 정보 불러오기
  const getEtcEduList = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const care = data.data.etc_education;
        setEtcEdu(care);
      });
  };
  useEffect(() => {
    getEtcEduList();
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
      title: title,
      organization: organization,
      start_date: openDate,
      end_date: closeDate,
      comment: note,
      portfolio_idx: portfolio_idx,
    };

    if (title && organization && openDate) {
      axios
        .post('http://localhost:3001/etc_educations', data)
        .then((res) => getEtcEduList())
        .catch((err) => console.log(err, '실패'));
    }

    setInputs({
      openDate: '',
      closeDate: '',
      title: '',
      organization: '',
      note: '',
    });
  };

  // 삭제
  async function removeEtcEdu(delEtcEdu) {
    console.log(delEtcEdu);
    await axios
      .delete(
        `http://localhost:3001/etc_educations/${delEtcEdu.etc_education_idx}`,
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const deletEtcEdu = etcEdu.filter((el) => el !== delEtcEdu);
    setEtcEdu(deletEtcEdu);
  }

  function EtcEducationListtt() {
    return (
      <div>
        {etcEdu?.map((el) => {
          return (
            <div key={el.etc_education_idx} className="EtcEduList">
              <div>
                <span>{el.start_date.substr(0, 10)} ~ </span>{' '}
                <span>{el.end_date.substr(0, 10)}</span>{' '}
              </div>
              <p>기관 : {el.organization}</p> <p>활동명: {el.title}</p>{' '}
              <p>{el.comment}</p>
              <button onClick={() => removeEtcEdu(el)} className="DeleteBtn">
                삭제
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="EtcEduInput">
        <div>
          <input
            type="date"
            name="openDate"
            value={openDate}
            placeholder="시작일"
            onChange={onChange}
          />
          <input
            type="date"
            name="closeDate"
            value={closeDate}
            placeholder="종료일"
            onChange={onChange}
          />
        </div>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="활동명"
          onChange={onChange}
        />
        <input
          type="text"
          name="organization"
          value={organization}
          placeholder="기관"
          onChange={onChange}
        />
        <input
          type="text"
          name="note"
          value={note}
          placeholder="비고"
          onChange={onChange}
        />
        <button onClick={onCreate}>등록</button>
      </div>
      <EtcEducationListtt />
    </div>
  );
}

export default EtcEducation;
