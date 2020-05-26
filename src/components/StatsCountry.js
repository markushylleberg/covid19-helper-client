import React, { useState, useEffect } from 'react';

import './StatsCountry.css';

const StatsCountry = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryData, setSelectedCountryData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      await fetch('http://localhost:9090/usercountries', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.countries);
        });
    };
    fetchCountries();
  }, []);

  const handleCountrySelect = async (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    await fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        data.Countries.map((country) => {
          if (country.CountryCode === selectedCountry) {
            setSelectedCountryData(country);
          }
        });
      });
  };

  return (
    <div className="stats-country-container margin-tb">
      <h1 className="no-mp sub-headline text-center">View data by country</h1>
      <div className="select-pair">
        <select onChange={(e) => handleCountrySelect(e)}>
          <option defaultValue={''}></option>
          {countries.map((country) => {
            return (
              <option key={country.id} value={country.code}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="single-country-data-container text-center">
        {selectedCountry !== '' ? (
          <div>
            {selectedCountryData.CountryCode ? (
              <div>
                <img
                  className="small-img"
                  src={require('../images/flags/' +
                    selectedCountryData.CountryCode +
                    '.png')}
                />
              </div>
            ) : (
              <></>
            )}
            <h3 className="text-center sub-headline">
              {selectedCountryData.Country}
            </h3>
            <div className="global-numbers">
              <p>
                Total confirmed:{' '}
                <span>{selectedCountryData.TotalConfirmed}</span>
              </p>
              <p>
                Total deaths: <span>{selectedCountryData.TotalDeaths}</span>
              </p>
              <p>
                Total recovered:{' '}
                <span>{selectedCountryData.TotalRecovered}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="small-text text-center">
            Country data will be shown here when selected
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCountry;
