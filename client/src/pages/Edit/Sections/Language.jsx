import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import LanguageList from './LanguageList';
import './Language.css';

function Language() {
  const [inputs, setInputs] = useState({
    languageDate: '',
    languageName: '',
    languageScore: '',
  });

  const nextId = useRef(0);
  const [state, setState] = useState('');
  const { portfolio_idx } = useParams();
  const [languages, setLanguages] = useState([]);

  const { languageDate, languageName, languageScore } = inputs;

  const getLanguage = async () => {
    await fetch(`http://localhost:3001/portfolios/${portfolio_idx}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const lang = data.data.language;
        setLanguages(lang);
      });
  };
  useEffect(() => {
    getLanguage();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 등록
  const onCreate = (e) => {
    e.preventDefault();

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
      setInputs({
        languageDate: '',
        languageName: '',
        languageScore: '',
      });
      setState('');

      nextId.current += 1;

      const data = {
        name: languageName,
        level: languageScore,
        acquisition_date: languageDate,
        portfolio_idx: portfolio_idx,
      };

      axios
        .post('http://localhost:3001/languages', data)
        .then((res) => getLanguage())
        .catch((err) => console.log(err, '실패'));
    }
  };

  // 삭제
  async function removeLang(delLang) {
    await axios
      .delete(`http://localhost:3001/languages/${delLang.language_idx}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const deletLang = languages.filter((el) => el !== delLang);
    setLanguages(deletLang);
  }

  //목록
  function LanguageList() {
    return (
      <div>
        {languages?.map((e) => {
          return (
            <div key={e.language_idx} className="LangList">
              <p>{e.acquisition_date.substr(0, 10)}</p>
              <p>외국어명 : {e.name}</p>
              <p>점수 : {e.level}점</p>
              <button onClick={() => removeLang(e)} className="DeleteBtn">
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
      <div className="LanguageWrap">
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
      </div>
      <LanguageList />
    </div>
  );
}

export default Language;
