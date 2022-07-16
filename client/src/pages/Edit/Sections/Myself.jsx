import React, { useState, useEffect } from 'react';

function Myself() {
  const [mySelf, setMySelf] = useState('');

  function mySelfChange(e) {
    console.log(e.target.value);
    setMySelf(e.target.value);
  }

  return (
    <div>
      <form>
        <textarea value={mySelf} onChange={mySelfChange}></textarea>
      </form>
    </div>
  );
}

export default Myself;
