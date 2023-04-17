import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <main className={classes.container}>
      <div className={classes["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
};

export default Loading;
