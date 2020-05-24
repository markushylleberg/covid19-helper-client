import React, { useState, useEffect } from 'react';
import Thread from './Thread';

import './ThreadsList.css';

const ThreadsList = (props) => {
  const [likedThreads, setLikedThreads] = useState([]);
  const [threads, setThreads] = useState([]);
  const [sort, setSort] = useState('newest');
  const [newestActive, setNewestActive] = useState(true);
  const [commentedActive, setCommentedActive] = useState(false);
  const [likedActive, setLikedActive] = useState(false);

  const toggleSort = (e) => {
    setSort(e);

    setNewestActive(false);
    setCommentedActive(false);
    setLikedActive(false);
    if (e === 'newest') {
      setNewestActive(true);
    } else if (e === 'mostcommented') {
      setCommentedActive(true);
    } else {
      setLikedActive(true);
    }
  };

  useEffect(() => {
    const fetchThreads = async () => {
      await fetch(`http://localhost:9090/threads/${sort}`, {
        method: 'GET',
        headers: { 'Content-type': 'Application/json' },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((response) => {
          const alreadyLikedThreads = response.liked;
          if (alreadyLikedThreads !== undefined) {
            alreadyLikedThreads.map((thread) => {
              const id = thread.thread;
              setLikedThreads((prev) => [...prev, id]);
            });
          }

          setThreads(response.response);
        });
    };
    fetchThreads();
  }, [props, setThreads, props.newThread, sort, likedActive]);

  return (
    <div>
      <div className="sorting-container">
        <button
          className={newestActive ? 'sort-tap active' : 'sort-tap'}
          value="newest"
          onClick={(e) => toggleSort(e.target.value)}
        >
          Newest
        </button>
        <button
          className={commentedActive ? 'sort-tap active' : 'sort-tap'}
          value="mostcommented"
          onClick={(e) => toggleSort(e.target.value)}
        >
          Most commented
        </button>
        <button
          className={likedActive ? 'sort-tap active' : 'sort-tap'}
          value="mostliked"
          onClick={(e) => toggleSort(e.target.value)}
        >
          Most liked
        </button>
      </div>
      {threads.map((thread) =>
        likedThreads.indexOf(thread.id) > -1 ? (
          <Thread
            liked={true}
            key={thread.id}
            user={props.user}
            data={thread}
          />
        ) : (
          <Thread
            liked={false}
            key={thread.id}
            user={props.user}
            data={thread}
          />
        )
      )}
    </div>
  );
};

export default ThreadsList;
