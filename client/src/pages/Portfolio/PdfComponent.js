import React from 'react';
import ReactToPrint from 'react-to-print';

import Portfolio from './Portfolio';
 
class PdfComponent extends React.Component {
     
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="pdfbtn btn btn-primary">PDF로 저장</button>}
          />
          <Portfolio ref={(response) => (this.componentRef = response)} />
        </div>
      );
    }
 
}

export default PdfComponent;