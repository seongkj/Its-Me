import React, { useState } from 'react';
import EtcEducationList from './EtcEducationList';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EtcEducation() {
  const { portfolio_idx } = useParams();
  const [inputs, setInputs] = useState({
    openDate: '',
    closeDate: '',
    title: '',
    organization: '',
    note: '',
  });

  const { openDate, closeDate, title, organization, note } = inputs;

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
        .then((res) => console.log(res, '성공'))
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

  return (
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
      <EtcEducationList />
    </div>
  );
}

export default EtcEducation;
