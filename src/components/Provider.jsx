import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import authContext from '../utils/context/index';
import '../utils/i18n';
import { useRouter } from 'next/router';
import Nav from './Nav';


const MyProvider = ({ children }) => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!userId);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setLoggedIn(!!id);
    setUserId(id);
    if (!id) {
      router.push('/login');
    }
  }, [])

  function logIn() {
    setLoggedIn(true);
  };

  function logOut() {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return true ? (
    <authContext.Provider value={{ loggedIn, logIn, logOut }} >
      <div className="d-flex flex-column h-100">
        <Nav />
        {children}
      </div>
      <ToastContainer />
    </authContext.Provider>
  ) : null;
}

export default MyProvider;
