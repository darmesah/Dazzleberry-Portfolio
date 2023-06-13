import classes from "./components/About.module.css";

const About = () => {
  return (
    <main className={classes.container}>
      <div>
        <h1 className={classes.main_h1}>About Dazzleberry</h1>
        <p>
          <p className={classes.p2}>
            Dazzleberry is a multi-disciplinary, independent design studio.
          </p>
          <p className={classes.p2}>
            Our work encompasses graphics and identity, strategy and
            positioning, products and packaging, exhibitions and installations,
            websites and digital experiences, advertising and communications,
            data visualizations and typefaces, sound and motion.{" "}
          </p>
          <p className={classes.p2}>
            Dazzleberry was created to deliver efficient, affordable, and
            flexible creative solutions to any business.
          </p>
        </p>
      </div>
      <div>
        <h2>Our Vision</h2>
        <p>
          Our work extends way beyond the computer screen. Dazzleberry is
          empowered by a dream to change the lives of millions through design
          and creativity. We are devoted to helping others grow with our
          services and resources.
        </p>
      </div>
      <div>
        <h2>Join Us</h2>
        <p>
          Get discovered. Introduce yourself, and we'll get in touch if there's
          a role that seems like a good match. <br />
          <a href="mailto:team@dazzleberrydesigns.com">Reach out</a>
        </p>
      </div>
    </main>
  );
};

export default About;
