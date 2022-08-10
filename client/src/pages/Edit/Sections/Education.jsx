import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Education.css';

function Education() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getEdu, setGetEdu] = useState([]);

  const { portfolio_idx } = useParams();

  //학력 GET
  const getEducations = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        setGetEdu(res.data.data.education);
      });
  };
  useEffect(() => {
    getEducations();
  }, []);

  //학력 POST
  async function onSubmit(data) {
    const newData = {
      school: data.school,
      status: data.status,
      major: data.major,
      graduate_date: data.graduate_date,
      portfolio_idx: portfolio_idx,
    };
    await axios
      .post('http://localhost:3001/educations', newData)
      .then((res) => {
        getEducations();
      })
      .catch((err) => console.log(err));
  }
  //학력 delete
  async function removeEdu() {
    await axios
      .delete(`http://localhost:3001/educations/${event.target.id}`)
      .then((res) => {
        getEducations();
      });
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
          {...register('graduate_date', {
            required: '졸업(예정)날짜를 입력하세요.',
          })}
        />
        {errors.graduate_date && <div>{errors.graduate_date.message}</div>}
        <button type="submit">등록</button>
      </form>
      <div>
        {getEdu.map((el) => (
          <div key={el.education_idx} className="EduList">
            <div>학교 : {el.school}</div>
            <div>전공 : {el.major}</div>
            <div>졸업일(예정일) : {el.graduate_date.substr(0, 10)}</div>
            <button
              type="button"
              id={el.education_idx}
              onClick={removeEdu}
              className="DeleteBtn"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
