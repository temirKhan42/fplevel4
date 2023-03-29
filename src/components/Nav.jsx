import { useTranslation } from 'react-i18next';
import useAuth from '../utils/hooks/index';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const auth = useAuth();
  const location = router.pathname;

  const handleClick = (e) => {
    e.preventDefault();
    if (location === '/') {
      return;
    }

    router.push('/');
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    auth.logOut();
    router.push('/');
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a href="/" className="navbar-brand" onClick={handleClick}>
          Hexlet Chat
        </a>
        {auth.loggedIn ? (
          <button
            type="button"
            onClick={handleLogOut}
            className="btn btn-primary"
          >
            {t('navbar.logout')}
          </button>
        ) : ''}
      </div>
    </nav>
  );
};

export default Nav;