import React, { useState, useRef } from 'react';
import EtcEducationList from './EtcEducationList';
import axios from 'axios';

function EtcEducation() {
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

  const [etcEducations, setEtcEducations] = useState([]);

  const nextId = useRef(0);

  // 등록
  const onCreate = () => {
    const etcEducation = {
      id: nextId.current,
      openDate,
      closeDate,
      title,
      organization,
      note,
    };
    setEtcEducations(etcEducations.concat(etcEducation));

    const data = {
      title: title,
      organization: organization,
      start_date: openDate,
      end_date: closeDate,
      comment: note,
      portfolio_idx: 1, // 나중에 확인 필요
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
    nextId.current += 1;
  };

  // 삭제
  const onRemove = (id) => {
    setEtcEducations(
      etcEducations.filter((etcEducation) => etcEducation.id !== id),
    );
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
      <EtcEducationList etcEducations={etcEducations} onRemove={onRemove} />
    </div>
  );
}

export default EtcEducation;
