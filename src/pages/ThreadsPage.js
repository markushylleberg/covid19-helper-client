import React, { useState } from 'react';
import ThreadsList from '../components/ThreadsList';
import ThreadForm from '../components/ThreadForm';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import './ThreadsPage.css';

const ThreadsPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [newThread, setNewThread] = useState([]);
  const canUserPost = props.user === undefined ? false : true;

  const handleModalChange = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleThreadPost = (obj) => {
    handleModalChange();
    setNewThread(obj);
  };

  return (
    <div className="page-wrapper-padding w-60">
      <h1 className="text-center headline">Tips and tricks</h1>
      <div>
        <p className="small-text text-center">
          This forum has been made for us all to help eachother out during the
          pandemic. Share your motivational thoughts and everyday life advice to
          inspire others!
        </p>
        <div>
          {openModal ? (
            <div
              className="btn-icon-close float-right"
              onClick={() => handleModalChange()}
            >
              <FiMinusCircle />
            </div>
          ) : (
            <div
              className="btn-icon float-right"
              onClick={() => handleModalChange()}
            >
              <FiPlusCircle />
            </div>
          )}
        </div>
      </div>
      {openModal ? (
        <>
          {canUserPost ? (
            <></>
          ) : (
            <p className="small-text w-60 margin-tb">
              You're not logged in at the moment. This thread will be posted by
              an anonymous user.
            </p>
          )}
          <ThreadForm user={props.user} handleThreadPost={handleThreadPost} />
        </>
      ) : (
        <></>
      )}
      <div>
        <ThreadsList user={props.user} newThread={newThread} />
      </div>
    </div>
  );
};

export default ThreadsPage;
