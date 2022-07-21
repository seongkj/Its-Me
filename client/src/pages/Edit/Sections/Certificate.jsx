import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import CertificateList from './CertificateList';

function Certificate() {
  const [inputs, setInputs] = useState({
    certificateDate: '',
    certificateName: '',
    certificateOrg: '',
  });

  const nextId = useRef(0);
  const [state, setState] = useState('');
  const [certificates, setCertificates] = useState([]);
  const { portfolio_idx } = useParams();

  const { certificateDate, certificateName, certificateOrg } = inputs;

  const getCertificate = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const cert = data.data.certificate;
        setCertificates(cert);
      });
  };
  useEffect(() => {
    getCertificate();
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
      setInputs({
        certificateDate: '',
        certificateName: '',
        certificateOrg: '',
      });
      setState('');

      nextId.current += 1;

      const data = {
        title: certificateName,
        organization: certificateOrg,
        acquisition_date: certificateDate,
        portfolio_idx: portfolio_idx,
      };

      axios
        .post('http://localhost:3001/certificates', data)
        .then((res) => getCertificate())
        .catch((err) => console.log(err, '실패'));
    }
  };

  // 삭제
  const onRemove = (id) => {
    axios
      .delete(`http://localhost:3001/certificates/${id}`)
      .then((res) => getCertificate())
      .catch((err) => console.log(err));

  };

  //목록
  function CertificateList() {
    return (
      <div>
        {certificates?.map((e) => {
          return (
            <div key={e.certificate_idx}>
              <span>{e.acquisition_date}</span>
              <span>{e.title}</span>
              <span>{e.organization}</span>
              <button onClick={() => onRemove(e.certificate_idx)}>삭제</button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="CertificateWrap">
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
      </div>
      <CertificateList />
    </div>
  );
}

export default Certificate;
