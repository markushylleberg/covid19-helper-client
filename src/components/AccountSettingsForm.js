import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const AccountSettingsForm = (props) => {
  const [userData, setUserData] = useState([]);
  const [userCountry, setUserCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setUserData(props.user);
    const getCountries = async () => {
      await fetch('http://localhost:9090/usercountries', {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.countries);
        });
    };
    getCountries();
  }, [setCountries, props]);

  const handleUpdate = async (e) => {
    await fetch('http://localhost:9090/accountsettings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id: userData.id,
        firstName: firstName,
        lastName: lastName,
        country: userCountry,
      }),
    });
  };

  return (
    <div className="text-center w-60">
      <div className="margin-tb">
        <FaUser />
      </div>
      <h3 className="sub-headline no-mp">PERSONAL INFO</h3>
      <form onSubmit={handleUpdate}>
        <div className="input-pair">
          <label>
            Current first name: <span>{userData.first_name}</span>
          </label>
          <input
            type="text"
            placeholder="Change first name ..."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-pair">
          <label>
            Current last name: <span>{userData.last_name}</span>
          </label>
          <input
            type="text"
            placeholder="Change last name ..."
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="select-pair">
          <label>Country:</label>
          <select onChange={(e) => setUserCountry(e.target.value)}>
            {countries.length > 0 ? (
              countries.map((country, index) => {
                if (country.code === userData.code) {
                  return (
                    <option key={index} value={country.id} selected>
                      {country.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={index} value={country.id}>
                      {country.name}
                    </option>
                  );
                }
              })
            ) : (
              <option>Loading countries...</option>
            )}
          </select>
        </div>
        <button className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default AccountSettingsForm;
