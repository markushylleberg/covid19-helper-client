import React, { useState, useEffect } from 'react';
import { FaGlobeEurope } from 'react-icons/fa';
import Moment from 'react-moment';

import './StatsSummary.css';

const StatsSummary = (props) => {
  const [loadDate, setLoadDate] = useState('');
  const [globalStats, setGlobalStats] = useState([]);
  const [userCountryData, setUserCountryData] = useState([]);

  const isUserLoggedIn = props.user === undefined ? false : props.user.id;

  useEffect(() => {
    const fetchStats = async () => {
      await fetch('https://api.covid19api.com/summary', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setLoadDate(data.Date);
          setGlobalStats(data.Global);
          if (isUserLoggedIn) {
            data.Countries.map((country) => {
              if (country.CountryCode === props.user.code) {
                setUserCountryData(country);
              }
            });
          }
        });
    };
    fetchStats();
  }, [props]);

  return (
    <div>
      <h1 className="sub-headline text-center">summary</h1>
      <div className="summary-stats">
        <div className="border-right global-stats text-center">
          <FaGlobeEurope />
          <p className="under-headline">Global</p>
          <p className="small-text">
            Updated <Moment fromNow>{loadDate}</Moment>
          </p>
          <div className="global-numbers">
            <p>
              Total confirmed: <span>{globalStats.TotalConfirmed}</span>
            </p>
            <p>
              Total deaths: <span>{globalStats.TotalDeaths}</span>
            </p>
            <p>
              Total recovered: <span>{globalStats.TotalRecovered}</span>
            </p>
          </div>
        </div>
        <div className="country-stats">
          {isUserLoggedIn ? (
            <div className="text-center">
              <img
                className="small-img"
                src={require('../images/flags/' + props.user.code + '.png')}
              />
              <p className="under-headline">{userCountryData.Country}</p>
              <p className="small-text">
                Updated <Moment fromNow>{loadDate}</Moment>
              </p>
              <div className="global-numbers">
                <p>
                  Confirmed: <span>{userCountryData.TotalConfirmed}</span>
                </p>
                <p>
                  Deaths: <span>{userCountryData.TotalDeaths}</span>
                </p>
                <p>
                  Recovered: <span>{userCountryData.TotalRecovered}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="small-padding">
              <p className="small-text text-center margin-tb">
                You need to log in to get quick access to data from your
                country.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
