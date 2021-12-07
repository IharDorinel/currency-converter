import React from 'react';

const CurrRates = ({data, choosePref}) => {
 
  return (
    <>
      {data.slice(0, 3).map(el => (
        <div className="CurrRates" key={el.ccy} onClick={choosePref}>
          1 {el.ccy} - {el.buy} UAH
        </div>
      ))}
    </>
  )
}

export default CurrRates;