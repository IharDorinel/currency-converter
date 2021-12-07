import React, {useState, useEffect} from 'react';
import './App.css';
import CurrRates from './components/CurrRates';
import SecondInput from './components/SecondInput';
import FirstInput from './components/FirstInput';

function App() {
  
  const [currOptions, setCurrOptions] = useState();
  
  const [curr2Options, setCurr2Options] = useState([]);
  
  const [curr3Options, setCurr3Options] = useState([]);
  
  const [toCurrency, setToCurrency] = useState();
  
  const [exchangeRate, setExchangeRate] = useState();
  
  const [amount, setAmount] = useState(1);
  
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  
  let toAmount, fromAmount;
  if(amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount / exchangeRate).toFixed(4);
  } else {
    toAmount = amount;
    fromAmount = (amount * exchangeRate).toFixed(2);
  };
  
  
  const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrOptions(data[0].base_ccy);
        setCurr2Options(data.slice(0, 3).map(el => el.ccy));
        setCurr3Options(data.slice(0, 3));
        if(localStorage.getItem('PrefCurr')) {
          setToCurrency(localStorage.getItem('PrefCurr'));
        } else {
          setToCurrency(data[0].ccy)
        };
      })
  }, [])
  
  
  useEffect(() => {
    if(toCurrency !== null && toCurrency !== undefined) {
      fetch(url)
        .then(res => res.json())
        .then(data => setExchangeRate(data.slice(0, 3).filter(el => el.ccy === toCurrency).map(el => Number(el.buy))[0]))
    }
  }, [toCurrency])
  
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true)
  }
  
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false)
  }
  
  const choosePref = (e) => {
    const preferable = e.target.textContent.slice(2, 5);
    localStorage.setItem('PrefCurr', preferable)
    alert(`${preferable} is saved as preferable`)
  }
    
  
  return (
    <div className="App">
      <h1>Currency converter for Ukrainian hryvna</h1>
      <p>You can click a currency and it will be saved as preferable</p>
      <CurrRates data={curr3Options} choosePref={choosePref}/>
      <FirstInput data={currOptions} amount={fromAmount} onChangeAmount={handleFromAmountChange}/>
      <br/>
      <SecondInput data={curr2Options} selectedCurrency={toCurrency}
                   onChangeCurrency={(e) => setToCurrency(e.target.value)}
                   amount={toAmount} onChangeAmount={handleToAmountChange}/>
    </div>
  );
}

export default App;