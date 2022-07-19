import React from 'react';
import { useState, useRef } from 'react';
import LanguageList from './LanguageList';
import axios from 'axios';

function Language() {
  const [inputs, setInputs] = useState({
    languageDate: '',
    languageName: '',
    languageScore: '',
  });

  const { languageDate, languageName, languageScore } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [languages, setLanguages] = useState([]);

  const nextId = useRef(0);

  // 등록
  const onCreate = () => {
    const language = {
      id: nextId.current,
      languageDate,
      languageName,
      languageScore,
    };
    if (languageDate === '') {
      alert('취득일을 등록해주세요');
    } else if (languageName === '') {
      alert('언어 명을 등록해주세요');
    } else if (languageScore === '') {
      alert('점수/등급을 등록해주세요');
    } else if (
      languageDate !== '' &&
      languageName !== '' &&
      languageScore !== ''
    ) {
      setLanguages(languages.concat(language));

      const data = {
        name: languageName,
        level: languageScore,
        acquisition_date: languageDate,
        portfolio_idx: 1,
      };

      if (languageName && languageScore && languageDate) {
        axios
          .post('http://localhost:3001/languages', data)
          .then((res) => console.log(res, '성공'))
          .catch((err) => console.log(err, '실패'));
      }

      setInputs({
        languageDate: '',
        languageName: '',
        languageScore: '',
      });
      nextId.current += 1;
    }
  };

  // 삭제
  const onRemove = (id) => {
    setLanguages(languages.filter((language) => language.id !== id));
  };

  return (
    <div>
      <input
        type="date"
        name="languageDate"
        value={languageDate}
        placeholder="취득일"
        onChange={onChange}
      />
      <input
        type="text"
        name="languageName"
        value={languageName}
        placeholder="외국어명"
        onChange={onChange}
      />
      <input
        type="text"
        name="languageScore"
        value={languageScore}
        placeholder="점수"
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
      <LanguageList languages={languages} onRemove={onRemove} />
    </div>
  );
}

export default Language;
