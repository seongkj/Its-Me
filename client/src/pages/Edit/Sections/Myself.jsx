import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Myself() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mySelf, setMySelf] = useState('');

  function mySelfChange(e) {
    console.log(e.target.value);
    setMySelf(e.target.value);
  }

  async function postIntroduce() {
    const newData = {
      comment: '한 줄 소개 입니다.',
      portfolio_idx: 1,
    };
    await axios
      .post('http://localhost:3001/introduces', newData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(postIntroduce)}>
        <textarea
          value={mySelf}
          {...register('comment', { required: '한 줄 소개를 입력하세요' })}
          onChange={mySelfChange}
        ></textarea>
        {errors.comment && <div>{errors.comment.message}</div>}
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default Myself;
