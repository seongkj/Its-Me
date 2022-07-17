import React from 'react';
import { useState, useRef } from 'react';
import LanguageList from './LanguageList';

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
    setLanguages(languages.concat(language));

    setInputs({
      languageDate: '',
      languageName: '',
      languageScore: '',
    });
    nextId.current += 1;
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
