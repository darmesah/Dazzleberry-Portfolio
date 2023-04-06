import { Link } from 'react-router-dom';

import classes from './components/Home.module.css';
import HomeDesignList from './components/HomeDesignsList';

const Home = () => {
  return (
    <main className={classes.main}>
      <h1 className={classes.h1}>All-in-one studio for star-quality design</h1>
      <div className={classes.nav}>
        <ul>
          <li>
            <Link to="work/all">ALL</Link>
          </li>
          <li>
            <Link>BRAND IDENTITY</Link>
          </li>
          <li>
            <Link>ILLUSTRATION</Link>
          </li>
          <li>
            <Link>PACKAGING</Link>
          </li>
          <li>
            <Link>UI & INTERACTION DESIGN</Link>
          </li>
          <li>
            <Link to="work/industry">BY INDUSTRY</Link>
          </li>
        </ul>
      </div>
      <HomeDesignList />
      <p>
        <Link to="work">VIEW ALL PROJECTS</Link>
      </p>
    </main>
  );
};

export default Home;
