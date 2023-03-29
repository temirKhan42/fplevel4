import useAuth from '../utils/hooks/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = () => {

  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.loggedIn) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  })



  return <p>Redirecting...</p>;
};

export default PrivateRoute;