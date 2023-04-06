import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <main className={classes.container}>
      <div className={classes.privacy}>
        <p>
          <Link to="privacy-policy">Privacy Policy</Link>
        </p>
        <p>© 2015 - {new Date().getFullYear()} Dazzleberry</p>
      </div>
      <div className={classes.social}>
        <p>
          <a href="mailto:team@dazzleberrydesigns.com">Mail</a>
        </p>
        <p>
          <a
            href="https://www.instagram.com/dazzleberryTM/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </p>
        <p>
          <a
            href="https://twitter.com/dazzleberryTM"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>
      </div>
    </main>
  );
};

export default Footer;
