import React from 'react';
import StatsSummary from '../components/StatsSummary';
import StatsCountry from '../components/StatsCountry';

const HomePage = (props) => {
  return (
    <div className="page-wrapper-padding w-60">
      <h1 className="headline text-center">Home</h1>
      <StatsSummary user={props.user} />
      <StatsCountry />
    </div>
  );
};

export default HomePage;
