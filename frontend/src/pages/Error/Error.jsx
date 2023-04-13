import { useRouteError } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import MainNavigation from "../../components/Navigation/MainNavigation/MainNavigation";
import classes from "./components/Error.module.css";

const Error = () => {
  const error = useRouteError();

  let title = "An error occurred...";
  let message = "Sorry something went wrong while fetching data.";

  if (error.status === 404) {
    title = "Page not found...";
    message =
      "Sorry the page you are looking for doesn't exist or has been moved.";
  }

  return (
    <>
      <MainNavigation />
      <main className={classes.container}>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
      <Footer />
    </>
  );
};

export default Error;
