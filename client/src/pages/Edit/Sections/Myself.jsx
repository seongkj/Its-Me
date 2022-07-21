import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Myself() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mySelf, setMySelf] = useState('');
  const [newMySelf, setNewMySelf] = useState();

  const { portfolio_idx } = useParams();

  function mySelfChange(e) {
    setMySelf(e.target.value);
  }

  // 한 줄 소개 GET
  const getStack = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
        // console.log(res.data.data.introduce[0].introduce_idx);
        setNewMySelf(res.data.data.introduce);
      });
  };
  useEffect(() => {
    getStack();
  }, []);

  // 한 줄 소개 POST, PATCH
  async function postIntroduce(data) {
    const newData = {
      comment: data.comment,
      portfolio_idx: portfolio_idx,
    };
    if (newMySelf.length >= 1) {
      console.log('업데이트');
      await axios
        .patch(
          `http://localhost:3001/introduces/${newMySelf[0].introduce_idx}`,
          newData,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log('새로운 생성');
      await axios
        .post('http://localhost:3001/introduces', newData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  // 한 줄 소개 delete
  async function removeIntroduce(delIdx) {
    await axios
      .delete(`http://localhost:3001/introduces/${delIdx.introduces_idx}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  //테스트 함수
  async function testz() {
    if (newMySelf.length < 1) {
      console.log('asdf');
    }
    console.log(newMySelf);
    console.log(newMySelf[0].introduce_idx);
    // await axios.delete(`http://localhost:3001/introduces/8`).then((res) => {
    //   console.log(res);
    // });
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
        <button type="button" onClick={testz}>
          test 버튼
        </button>
        {newMySelf ? <div>한 줄 소개 : {newMySelf[0].comment}</div> : null}
      </form>
    </div>
  );
}

export default Myself;
