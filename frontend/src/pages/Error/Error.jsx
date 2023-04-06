import Footer from '../../components/Footer/Footer';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import classes from './components/Error.module.css';

const Error = () => {
  return (
    <>
      <MainNavigation />
      <main className={classes.container}>
        <h5>404 Error</h5>
        <h1>Page not found...</h1>
        <p>
          Sorry the page you are looking for doesn't exist or has been moved.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Error;
