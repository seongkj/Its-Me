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
  const [newMySelf, setNewMySelf] = useState([]);

  const { portfolio_idx } = useParams();

  function mySelfChange(e) {
    setMySelf(e.target.value);
  }

  // 한 줄 소개 GET
  const getStack = async () => {
    await axios
      .get(`http://localhost:3001/portfolios/${portfolio_idx}`)
      .then((res) => {
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
    const newPofol = {
      template: 0,
      title: data.comment,
      user_idx: localStorage.getItem('userIdx'),
    };

    if (newMySelf.length >= 1) {
      await axios
        .patch(
          `http://localhost:3001/introduces/${newMySelf[0].introduce_idx}`,
          newData,
        )
        .then((res) => {
          const newdata = res.data.data;
          setNewMySelf([
            {
              introduce_idx: newdata.introduceIdx,
              comment: newdata.comment,
              portfolio_idx: newdata.portfolio_idx,
            },
          ]);
        })
        .catch((err) => console.log(err));
      // 포트폴리오 타이틀 제목 PATCH
      await axios
        .patch(`http://localhost:3001/portfolios/${portfolio_idx}`, newPofol)
        .catch((err) => console.log(err));
    } else {
      await axios
        .post('http://localhost:3001/introduces', newData)
        .then((res) => {
          const newdata = res.data.data;
          setNewMySelf([
            {
              introduce_idx: newdata.introduceIdx,
              comment: newdata.comment,
              portfolio_idx: newdata.portfolio_idx,
            },
          ]);
        })
        .catch((err) => console.log(err));
      // 포트폴리오 타이틀 제목 PATCH
      await axios
        .patch(`http://localhost:3001/portfolios/${portfolio_idx}`, newPofol)
        .catch((err) => console.log(err));
    }
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
        <button type="submit">{newMySelf.length >= 1 ? '수정' : '등록'}</button>
        {newMySelf.map((el, i) => (
          <div key={i} style={{ marginTop: '20px', fontWeight: 'bold' }}>
            한 줄 소개 : {el.comment}
          </div>
        ))}
      </form>
    </div>
  );
}

export default Myself;
