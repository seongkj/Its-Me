import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './Education.css';

function Education() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [value1, setValue1] = useState('');
  const handleChange = (event) => setValue1(event.target.value);

  useEffect(() => {
    const newData = {
      school: 'zzz',
      status: 'xxx',
      major: 'ccc',
      graduate_date: '2022-07-15',
      portfolio_idx: 1,
    };
    const debounce = setTimeout(() => {
      console.log(value1);
      axios
        .post('http://localhost:3001/educations', newData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }, 1000);
    return () => clearTimeout(debounce);
  }, [value1]);

  function onSubmit(data) {
    const newData = {
      school: 'zzz',
      status: 'xxx',
      major: 'ccc',
      graduate_date: '2022-07-15',
      portfolio_idx: 1,
    };
    console.log(data);
    axios
      .post('http://localhost:3001/educations', newData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form className="Edu" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register('eduName', { required: '학교를 입력하세요.' })}
            placeholder="학교이름"
            onChange={handleChange}
          />
          <select {...register('status', { required: '상태를 입력하세요.' })}>
            <option key="1">재학 중</option>
            <option key="2">졸업 예정</option>
            <option key="3">졸업</option>
          </select>
        </div>
        <input
          type="text"
          {...register('major', { required: '전공을 입력하세요.' })}
          placeholder="전공"
        />
        <input
          type="date"
          {...register('date', { required: '날짜를 입력하세요.' })}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default Education;
