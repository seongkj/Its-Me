import React from 'react';

function Language({ language, onRemove }) {
  return (
    <div>
      <span>{language.languageDate}</span> <span>{language.languageName}</span> <span>{language.languageScore}</span>
      <button onClick={() => onRemove(language.id)}>삭제</button>
    </div>
  );
}

function LanguageList({ languages, onRemove }) {
  return (
    <div>
      {languages.map(language => (
        <Language language={language} key={language.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default LanguageList;