import React from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

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

const styles = { button: { position: 'fixed', bottom: '30px', right: '30px' } };

export default PdfComponent;
