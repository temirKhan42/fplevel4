import { useTranslation } from 'react-i18next';
import useAuth from '../utils/hooks/index';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Nav = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const auth = useAuth();

  const handleLogOut = (e) => {
    e.preventDefault();
    router.push('/login');
    auth.logOut();
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a href="/" className="navbar-brand">
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