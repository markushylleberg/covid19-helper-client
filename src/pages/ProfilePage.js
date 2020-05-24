import React, { useState, useEffect } from 'react';
import LikeCard from '../components/LikeCard';

import './ProfilePage.css';

const ProfilePage = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchLikedThreads = async () => {
      await fetch('http://localhost:9090/threads/liked', {
        method: 'GET',
        headers: { 'Content-type': 'Application/json' },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setThreads(data.response);
        });
    };
    fetchLikedThreads();
  }, [setThreads]);

  return (
    <div className="page-wrapper-padding w-60">
      <h1 className="text-center headline">My profile</h1>
      <div className="divider"></div>
      <h3 className="sub-headline">Recently liked threads</h3>
      <div className="profile-page-liked">
        {threads.map((thread) => {
          return <LikeCard key={thread.id} thread={thread} />;
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
