import React, { useState, useEffect } from 'react';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('http://localhost:9090/usercountries', {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => setCountriesList(data.countries));
    };
    getCountries();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        country: country,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setMessage(response.message);
      });
  };

  return (
    <div className="text-center w-60">
      <h1 className="headline text-center">Sign up</h1>
      <p className="small-text w-60 margin-3">
        Welcome to COVID-19 Helper! This is a place where you can get the latest
        numbers on the pandemic - and where to can also chat with other people
        and discuss the situation and share you best motivational advice and
        everyday tips!
      </p>
      <form onSubmit={handleSignUp}>
        <div className="input-pair">
          <label>First name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input-pair">
          <label>Last name</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input-pair">
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-pair">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-pair">
          <label>Confirm password</label>
          <input
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="select-pair">
          <label>Choose country</label>
          <select onChange={(e) => setCountry(e.target.value)}>
            <option></option>
            {countriesList.length > 0 ? (
              countriesList.map((country, index) => {
                return (
                  <option key={index} value={country.id}>
                    {country.name}
                  </option>
                );
              })
            ) : (
              <option>Loading countries...</option>
            )}
          </select>
        </div>
        <button className="submit-btn">Sign up</button>
        <p>{message !== '' ? message : ''}</p>
      </form>
    </div>
  );
};

export default SignUpForm;
