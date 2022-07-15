import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css';

const autoGrow = (e) => {
  e.style.height = '5px';
  e.style.height = e.scrollHeight + 'px';
};

const Project = () => {
  const [projects, setProjects] = useState([{}]);
  const [whatIdid, setWhatIdid] = useState([]);
  // console.log(title);
  const newProject = (e) => {
    e.preventDefault();
    setProjects([...projects, {}]);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setWhatIdid({
      ...whatIdid,
      value,
    });
  };
  console.log(whatIdid);

  return (
    <div>
      <div className="ProjectWrap">
        <button type="button" className="AddSlider" onClick={newProject}>
          +
        </button>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          {projects.map((project) => (
            <SwiperSlide>
              <form>
                <div className="ProjectWrap1">
                  <img
                    src="https://t1.daumcdn.net/cfile/tistory/99ACFA3359A6674308"
                    alt=""
                  />
                  <span>사진 추가</span>
                </div>
                <div className="ProjectWrap2">
                  <input type="text" placeholder="프로젝트명" />
                  <div className="date">
                    <input
                      type="date"
                      name="startProject"
                      id="StartProject"
                      placeholder="시작일"
                    />
                    <input
                      type="date"
                      name="endProject"
                      id="EndProject"
                      placeholder="완료일"
                    />
                  </div>
                </div>
                <div className="ProjectWrap3">
                  <TextareaAutosize
                    placeholder="역할 및 주요 성과"
                    onChange={onChange}
                  />
                </div>
                <div className="ProjectWrap4">
                  <p>
                    <FontAwesomeIcon icon={faLink} />
                    <span>
                      <input
                        type="text"
                        name="linksec"
                        id="LinkSec"
                        className="LinkSec"
                        placeholder="링크 추가"
                      />
                    </span>
                  </p>
                </div>
              </form>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Project;
