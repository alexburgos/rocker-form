import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import { fetchCountries, loadCachecCountries, setCountry } from './store/actions';

function App() {
  const formState = useSelector(state => state);
  const dispatch = useDispatch();


  useEffect(() => {
    let cachedCountries = JSON.parse(localStorage.getItem('countries'));
    if (cachedCountries && cachedCountries.length > 0) {
      dispatch((loadCachecCountries(cachedCountries)));
    } else {
      dispatch(fetchCountries());
    }
  }, []);

  function handleSelect(e) {
    console.log(e.target.value);
    dispatch(setCountry(e.target.value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-body">
        <form className="App-form">
          <label>Social Security Number</label>
          <input type="text" placeholder="YYMMDD-XXXX" required />
          <label>Phone Number</label>
          <input type="text" placeholder="‭+46 70-000 00 00"required />
          <label>Email</label>
          <input type="email" placeholder="your@email.com" required />
          <label>Country</label>
          <select onChange={handleSelect} value={formState.selectedCountry}>
            {
              formState.countries.map( (country, index) => {
                return <option key={index} value={country.name}>{country.name}</option>
              })
            }
          </select>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;