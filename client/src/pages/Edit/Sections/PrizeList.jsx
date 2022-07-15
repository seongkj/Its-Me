import React from 'react';

function Prize({ prize, onRemove }) {
  return (
    <div>
      <b>{prize.prizeDate}</b> <span>({prize.prizeName})</span>
      <button onClick={() => onRemove(prize.id)}>삭제</button>
    </div>
  );
}

function PrizeList({ prizes, onRemove }) {
  return (
    <div>
      {prizes.map(prize => (
        <Prize prize={prize} key={prize.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default PrizeList;
