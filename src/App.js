import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import { fetchCountries, loadCachecCountries, setCountry, fieldChange, validateForm } from './store/actions';

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

  function handleChange(e) {
    let {
      name,
      value
    } = e.target;

    dispatch(fieldChange(name, value));
  }

  function handleSelect(e) {
    dispatch(setCountry(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(validateForm());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-body">
        <form className="App-form" onSubmit={handleSubmit} noValidate>
          <div className="App-form-field">
            <label>Social Security Number</label>
            <input type="text" name="personNumber" placeholder="YYMMDDXXXX/YYMMDD-XXXX" maxLength="12" onChange={handleChange} className={formState.errors.personNumber ? 'error' : ''} />
            {formState.errors.personNumber && <span className="App-form--error">{formState.errors.personNumber}</span>}
          </div>
          <div className="App-form-field">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" placeholder="‭07xxxxxxxxx" onChange={handleChange} className={formState.errors.phoneNumber ? 'error' : ''} />
            {formState.errors.phoneNumber && <span className="App-form--error">{formState.errors.phoneNumber}</span>}
          </div>
          <div className="App-form-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="your@email.com" onChange={handleChange} className={formState.errors.email ? 'error' : ''} />
            {formState.errors.email && <span className="App-form--error">{formState.errors.email}</span>}
          </div>
          <label>Country</label>
          <select onChange={handleSelect} value={formState.country}>
            {
              formState.countries.map((country, index) => {
                return <option key={index} value={country.name}>{country.name}</option>
              })
            }
          </select>
          <button type="submit" >Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;