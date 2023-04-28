import { Link } from "react-router-dom";

import classes from "./components/Home.module.css";
import HomeDesignList from "./components/HomeDesignsList";

const Home = () => {
  return (
    <>
      <div className={classes.banner}>
        <p className={classes.banner_p1}>
          A TOP RATED MULTI-DISCIPLINARY DESIGN STUDIO
        </p>
        <h1 className={classes.h1}>
          All-in-one studio for stellar design that moves you forward.
        </h1>
        <p className={classes.banner_p2}>
          If you’re looking for a design team that’s{" "}
          <span>detail obsessed</span>, and marketing-savvy...
        </p>
        <p className={classes.banner_p3}>Then you’re in the right place!</p>
      </div>
      <main className={classes.main}>
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
        <div className={classes.talk}>
          <p>STARTING A NEW PROJECT?</p>
          <a href="mailto:team@dazzleberrydesigns.com">Let’s talk about you</a>
        </div>
      </main>
    </>
  );
};

export default Home;
