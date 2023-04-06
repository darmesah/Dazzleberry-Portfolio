import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/Navigation/MainNavigation/MainNavigation';
import Footer from '../components/Footer/Footer';
import Search from '../components/Search/Search';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Search />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
