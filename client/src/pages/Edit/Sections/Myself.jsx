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
  const [newMySelf, setNewMySelf] = useState();

  function mySelfChange(e) {
    setMySelf(e.target.value);
  }

  // 한 줄 소개 GET
  const getStack = async () => {
    await axios.get(`http://localhost:3001/portfolios/1`).then((res) => {
      setNewMySelf(res.data.data.introduce[0].comment);
    });
  };
  useEffect(() => {
    getStack();
  }, []);

  // 한 줄 소개 POST
  async function postIntroduce(data) {
    const newData = {
      comment: data.comment,
      portfolio_idx: 1,
    };
    setNewMySelf(data.comment);
    // await axios
    //   .post('http://localhost:3001/introduces', newData)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }

  // 한 줄 소개 delete
  async function removeIntroduce(delIdx) {
    await axios
      .delete(`http://localhost:3001/introduces/${delIdx.introduces_idx}`)
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
        {newMySelf ? <div>한 줄 소개 : {newMySelf}</div> : null}
      </form>
    </div>
  );
}

export default Myself;
