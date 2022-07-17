import React from 'react';

function EtcEducation({ etcEducation, onRemove }) {
  return (
    <div>
      <span>{etcEducation.openDate}</span> <span>{etcEducation.closeDate}</span>{' '}
      <span>{etcEducation.title}</span> <span>{etcEducation.organization}</span>{' '}
      <span>{etcEducation.note}</span>
      <button onClick={() => onRemove(etcEducation.id)}>삭제</button>
    </div>
  );
}

function EtcEducationList({ etcEducations, onRemove }) {
  return (
    <div>
      {etcEducations.map((etcEducation) => (
        <EtcEducation
          etcEducation={etcEducation}
          key={etcEducation.id}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default EtcEducationList;
