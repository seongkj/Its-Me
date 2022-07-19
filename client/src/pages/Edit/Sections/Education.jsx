import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './Education.css';

function Education() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //학력 POST
  async function onSubmit(data) {
    const newData = {
      school: 'zzz',
      status: 'xxx',
      major: 'ccc',
      graduate_date: '2022-07-15',
      portfolio_idx: 1,
    };
    console.log(data);
    console.log(newData);
    await axios
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
            {...register('school', { required: '학교를 입력하세요.' })}
            placeholder="학교이름"
          />
          {errors.school && <div>{errors.school.message}</div>}
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
        {errors.major && <div>{errors.major.message}</div>}
        <input
          type="date"
          {...register('graduate_date', { required: '날짜를 입력하세요.' })}
        />
        {errors.graduate_date && <div>{errors.graduate_date.message}</div>}
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default Education;
