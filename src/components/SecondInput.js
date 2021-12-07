import React from 'react';

const SecondInput = ({data, selectedCurrency, onChangeCurrency, amount, onChangeAmount}) => {
 
  return (
    <>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {data.map(el => (
          <option value={el} key={el}>{el}</option>
        ))
        }
      </select>
      <input type="textarea" value={amount} onChange={onChangeAmount}/>
    </>
  )
}

export default SecondInput;
