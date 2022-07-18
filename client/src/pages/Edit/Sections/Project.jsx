import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import ProjectList from './ProjectList';

const autoGrow = (e) => {
  e.style.height = '5px';
  e.style.height = e.scrollHeight + 'px';
};

const Project = ({ ownerData, setOwnerData }) => {
  const [inputs, setInputs] = useState({
    thumbnail: '',
    title: '',
    start_date: '',
    end_date: '',
    comment: '',
    link: '',
  });

  const { thumbnail, title, start_date, end_date, comment, link } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 등록
  const nextId = useRef(0);
  const [projects, setProjects] = useState([]);

  const onCreate = (e) => {
    e.preventDefault();
    const project = {
      id: nextId.current,
      thumbnail,
      title,
      start_date,
      end_date,
      comment,
      link,
    };
    if (title === '') {
      alert('타이틀을 등록해주세요');
    } else if (start_date === '') {
      alert('시작일을 등록해주세요');
    } else if (end_date === '') {
      alert('완료일을 등록해주세요');
    } else if (comment === '') {
      alert('상세 설명을 등록해주세요');
    } else if (
      title !== '' &&
      start_date !== '' &&
      end_date !== '' &&
      comment !== ''
    ) {
      setProjects(projects.concat(project));
      setInputs({
        thumbnail: '',
        title: '',
        start_date: '',
        end_date: '',
        comment: '',
        link: '',
      });
      nextId.current += 1;
    }
  };

  // 이미지 업로드
  const [img, setImg] = useState('');

  const formSubmit = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);

    axios
      .post('http://localhost:3001/websites/1', formData)
      .then((res) => {
        setImg(res.data.location);
        alert('성공');
      })
      .catch((err) => {
        alert('실패');
      });
  };

  // 삭제
  const onRemove = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div>
      <div className="ProjectWrap">
        {/* <button type="button" className="AddSlider">
          +
        </button> */}
        <form>
          <div className="ProjectWrap1">
            <img src={img} alt="" name="thumbnail" value={thumbnail} />
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={formSubmit}
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
      <ProjectList projects={projects} onRemove={onRemove} />
    </div>
  );
};

export default Project;
