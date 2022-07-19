import React from 'react';
import { useState, useRef } from 'react';
import CertificateList from './CertificateList';
import axios from 'axios';

function Certificate() {
  const [inputs, setInputs] = useState({
    certificateDate: '',
    certificateName: '',
    certificateOrg: '',
  });

  const { certificateDate, certificateName, certificateOrg } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [certificates, setCertificates] = useState([]);

  const nextId = useRef(0);

  // 등록
  const onCreate = () => {
    const certificate = {
      id: nextId.current,
      certificateDate,
      certificateName,
      certificateOrg,
    };
    if (certificateDate === '') {
      alert('취득일을 등록해주세요');
    } else if (certificateName === '') {
      alert('자격증 명을 등록해주세요');
    } else if (certificateOrg === '') {
      alert('발급기관을 등록해주세요');
    } else if (
      certificateDate !== '' &&
      certificateName !== '' &&
      certificateOrg !== ''
    ) {
      setCertificates(certificates.concat(certificate));

      const data = {
        title: certificateName,
        organization: certificateOrg,
        acquisition_date: certificateDate,
        portfolio_idx: 1,
      };

      if (certificateName && certificateDate && certificateOrg) {
        axios
          .post('http://localhost:3001/certificates', data)
          .then((res) => console.log(res, '성공'))
          .catch((err) => console.log(err, '실패'));
      }

      setInputs({
        certificateDate: '',
        certificateName: '',
        certificateOrg: '',
      });
      nextId.current += 1;
    }
  };

  // 삭제
  const onRemove = (id) => {
    setCertificates(
      certificates.filter((certificate) => certificate.id !== id),
    );
  };

  return (
    <div>
      <input
        type="date"
        name="certificateDate"
        value={certificateDate}
        placeholder="취득일"
        onChange={onChange}
      />
      <input
        type="text"
        name="certificateName"
        value={certificateName}
        placeholder="자격증 명"
        onChange={onChange}
      />
      <input
        type="text"
        name="certificateOrg"
        value={certificateOrg}
        placeholder="발급기관"
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
      <CertificateList certificates={certificates} onRemove={onRemove} />
    </div>
  );
}

export default Certificate;
