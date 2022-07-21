import React from 'react';

function Prize({ prize, onRemove }) {
  return (
    <div>
      <span>{prize.prizeDate.substr(0, 10)}</span>{' '}
      <span>{prize.prizeName}</span>
      <button onClick={() => onRemove(prize.id)} className="DeleteBtn">
        삭제
      </button>
    </div>
  );
}

function PrizeList({ prizes, onRemove }) {
  return (
    <div>
      {prizes.map((prize) => (
        <Prize prize={prize} key={prize.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default PrizeList;
