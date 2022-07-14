import React from 'react';
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

  function onSubmit(data) {
    const newData = {
      eduName: data.eduName,
      status: data.status,
      major: data.major,
      date: data.date,
    };

    console.log(data);
    console.log(newData);
    axios
      .post('http://localhost:3001/portfolios', newData)
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
