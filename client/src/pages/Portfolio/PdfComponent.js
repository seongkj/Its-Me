import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import Portfolio from './Portfolio';

const PdfComponent = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => (
          <button className="btn btn-primary" style={styles.button}>
            PDF로 저장
          </button>
        )}
      />
      <Portfolio ref={componentRef} />
    </div>
  );
};

const styles = {
  button: {
    cursor: 'pointer',
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '10px 15px',
    backgroundColor: '#104892',
    color: 'white',
    borderRadius: '0.5rem',
    border: 'none',
  },
};

export default PdfComponent;
