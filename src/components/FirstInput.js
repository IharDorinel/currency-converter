import React from 'react';

const FirstInput = ({data, amount, onChangeAmount}) => {
  
  return (
    <>
      {<span>{data}</span>}
  <input className="FirstInput" type="textarea" value={amount} onChange={onChangeAmount} />
    </>
  )
}

export default FirstInput;
