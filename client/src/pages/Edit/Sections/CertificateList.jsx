import React from 'react';

function Certificate({ certificate, onRemove }) {
  return (
    <div>
      <span>{certificate.certificateDate}</span>{' '}
      <span>{certificate.certificateName}</span>{' '}
      <span>{certificate.certificateOrg}</span>
      <button onClick={() => onRemove(certificate.id)}>삭제</button>
    </div>
  );
}

function CertificateList({ certificates, onRemove }) {
  return (
    <div>
      {certificates.map((certificate) => (
        <Certificate certificate={certificate} key={certificate.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default CertificateList;
