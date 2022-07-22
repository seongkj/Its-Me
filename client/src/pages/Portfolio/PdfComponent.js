import React from 'react';
import ReactToPrint from 'react-to-print';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap"

import Portfolio from './Portfolio';

class PdfComponent extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          content={() => this.componentRef}
          trigger={() => (
            <button className="btn btn-primary" style={styles.button}>
              PDF로 저장
            </button>
          )}
        />
        <Portfolio ref={(response) => (this.componentRef = response)} />
      </div>
    );
  }
}

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
