import React from 'react';

function Career({ career, onRemove }) {
  return (
    <div>
      <span>{career.startDate}</span>
      <span>{career.endDate}</span> <span>{career.company}</span>
      <span>{career.position}</span> <span>{career.comment}</span>
      <button onClick={() => onRemove(career.id)}>삭제</button>
    </div>
  );
}

function CareerList({ careers, onRemove }) {
  return (
    <div>
      {careers.map((career) => (
        <Career career={career} key={career.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default CareerList;
