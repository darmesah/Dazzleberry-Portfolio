import classes from './components/Contact.module.css';

const Contact = () => {
  return (
    <main className={classes.container}>
      <h1 className={classes.header_h1}>Contact</h1>
      <p className={classes.header_text}>
        Our clients get the best results when they have our team dedicated to
        their business. Tell us all about your project.
      </p>
      <div className={classes.content}>
        <h2>Email</h2>
        <p>team@dazzleberrydesigns.com</p>
      </div>
      <div className={classes.content}>
        <h2>Office</h2>
        <p>
          Monday through Friday <br />
          8AM - 6PM <br />
          27 Ijaoye street, <br />
          Jibowu, Lagos.
        </p>
      </div>
    </main>
  );
};

export default Contact;
