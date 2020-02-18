import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from './assets/logo.svg';
import './styles/App.css';
import {
	fetchCountries,
	setCountry,
	fieldChange,
	validateForm,
	cacheFormState
} from './store/actions/index';

function App() {
  const formState = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formState.countries.length === 0) dispatch(fetchCountries());
  }, [dispatch]);

  function handleChange(e) {
    let {
      name,
      value
    } = e.target;

    dispatch(fieldChange(name, value));
  }

  function handleBlur() {
    dispatch(cacheFormState());
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
						<input
							type="text"
							name="personNumber"
							placeholder="YYMMDDXXXX/YYMMDD-XXXX"
							maxLength="15"
							value={formState.personNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							className={formState.errors.personNumber ? 'error' : ''}
						/>
						{formState.errors.personNumber && (
							<span className="App-form--error">
								{formState.errors.personNumber}
							</span>
						)}
					</div>
					<div className="App-form-field">
						<label>Phone Number</label>
						<input
							type="text"
							name="phoneNumber"
							placeholder="‭07xxxxxxxxx"
							maxLength="15"
							value={formState.phoneNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							className={formState.errors.phoneNumber ? 'error' : ''}
						/>
						{formState.errors.phoneNumber && (
							<span className="App-form--error">
								{formState.errors.phoneNumber}
							</span>
						)}
					</div>
					<div className="App-form-field">
						<label>Email</label>
						<input
							type="email"
							name="email"
							placeholder="your@email.com"
							value={formState.email}
							onChange={handleChange}
							onBlur={handleBlur}
							className={formState.errors.email ? 'error' : ''}
						/>
						{formState.errors.email && (
							<span className="App-form--error">{formState.errors.email}</span>
						)}
					</div>
					<label>Country</label>
					<select
						onChange={handleSelect}
						onBlur={handleBlur}
						value={formState.country}
						className={formState.errors.country ? 'error' : ''}
					>
						<option value="" disabled>
							Select
						</option>
						{formState.countries.map(country => {
							return (
								<option key={country.numericCode} value={country.name}>
									{country.name}
								</option>
							);
						})}
					</select>
					{formState.errors.country && (
						<span className="App-form--error">{formState.errors.country}</span>
					)}
					<button type="submit">Submit</button>
				</form>
			</main>
		</div>
	);
}

export default App;