import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Project.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
// import ProjectList from './ProjectList';

const autoGrow = (e) => {
  e.style.height = '5px';
  e.style.height = e.scrollHeight + 'px';
};

const Project = ({ ownerData, setOwnerData }) => {
  const [inputs, setInputs] = useState({
    img: '',
    title: '',
    start_date: '',
    end_date: '',
    comment: '',
    link: '',
  });
  const nextId = useRef(0);
  const [state, setState] = useState('');
  const [websites, setWebsites] = useState([]);
  const [imgFile, setImgFile] = useState('');

  const { portfolio_idx } = useParams();

  const { img, title, start_date, end_date, comment, link } = inputs;

  const getWebsite = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const webs = data.data.website;
        setWebsites(webs);
      });
  };
  useEffect(() => {
    getWebsite();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 이미지 미리보기
  const previewImg = (e) => {
    const reader = new FileReader();
    const img = e.target.files[0];
    setImgFile(img);
    reader.readAsDataURL(img);
    reader.onload = function (e) {
      setState(e.target.result);
    };
  };

  // 등록
  const onCreate = (e) => {
    e.preventDefault();
    if (title === '') {
      alert('타이틀을 등록해주세요');
    } else if (start_date === '') {
      alert('시작일을 등록해주세요');
    } else if (end_date === '') {
      alert('완료일을 등록해주세요');
    } else if (comment === '') {
      alert('상세 설명을 등록해주세요');
    } else if (imgFile === '') {
      alert('썸네일을 등록해주세요');
    } else if (
      title !== '' &&
      start_date !== '' &&
      end_date !== '' &&
      comment !== ''
    ) {
      setInputs({
        img: '',
        title: '',
        start_date: '',
        end_date: '',
        comment: '',
        link: '',
      });
      setState('');

      var files = document.getElementById('Upload');
      files.reset();
      nextId.current += 1;

      // post
      // const img = document.querySelector('#img').files[0];
      const formData = new FormData();
      formData.append('img', imgFile);
      formData.append('title', title);
      formData.append('link', link);
      formData.append('comment', comment);
      formData.append('start_date', start_date);
      formData.append('end_date', end_date);
      formData.append('portfolio_idx', portfolio_idx);

      axios
        .post('http://localhost:3001/websites', formData)
        .then((res) => getWebsite())
        .catch((err) => console.log(err));
    }
  };

  // 삭제
  const onRemove = (id) => {
    axios
      .delete(`http://localhost:3001/websites/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    getWebsite();
  };

  // 목록 출력
  function ProjectList() {
    return (
      <div className="ProjectList">
        {websites?.map((e) => {
          return (
            <div key={e.website_idx}>
              <div className="ProjectWrap1">
                <img src={e.thumbnail} alt="" name="thumbnail" />
              </div>
              <div className="ProjectWrap2">
                <h3>{e.title}</h3>
                <div className="date">
                  <span>{e.start_date.substr(0, 10)} ~ </span>
                  <span>{e.end_date.substr(0, 10)}</span>
                </div>
                <p className="CommentWrap">{e.comment}</p>
                <p className="LinkWrap">
                  <FontAwesomeIcon icon={faLink} />
                  <a href={e.link} target="_blank">
                    {e.link}
                  </a>
                </p>
              </div>
              <button
                onClick={() => onRemove(e.website_idx)}
                className="DeleteBtn"
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="ProjectWrap">
        <form id="Upload" method="post">
          <div className="ProjectWrap1">
            <img src={state} alt="" name="thumbnail" />
            <label htmlFor="ImgInput">+</label>
            <input
              type="file"
              accept="image/*"
              name="img"
              id="ImgInput"
              value={img}
              onChange={previewImg}
              style={{ position: 'absolute', left: '0', top: '0' }}
            />
          </div>
          <div className="ProjectWrap2">
            <input
              type="text"
              placeholder="프로젝트명"
              name="title"
              value={title}
              onChange={onChange}
            />
            <div className="date">
              <input
                type="date"
                name="start_date"
                id="StartProject"
                placeholder="시작일"
                value={start_date}
                onChange={onChange}
              />
              <input
                type="date"
                name="end_date"
                id="EndProject"
                placeholder="완료일"
                value={end_date}
                onChange={onChange}
              />
            </div>
            <TextareaAutosize
              placeholder="역할 및 주요 성과"
              name="comment"
              value={comment}
              onChange={onChange}
            />
            <p>
              <FontAwesomeIcon icon={faLink} />
              <span>
                <input
                  type="text"
                  id="LinkSec"
                  className="LinkSec"
                  placeholder="링크 추가"
                  name="link"
                  value={link}
                  onChange={onChange}
                />
              </span>
            </p>
          </div>
          <button onClick={onCreate}>등록</button>
        </form>
      </div>
      <ProjectList />
    </div>
  );
};

export default Project;
