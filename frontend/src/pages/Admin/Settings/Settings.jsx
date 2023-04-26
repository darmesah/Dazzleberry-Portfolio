import SettingsForm from "./components/SettingsForm/SettingsForm";

import classes from "./components/Settings.module.css";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../../../components/UIElements/Loading/Loading";

const Settings = () => {
  const { userInfo } = useLoaderData();

  return (
    <main className={classes.container}>
      <h1 className={classes.header}>Settings</h1>
      <p className={classes.p1}>Adjust your account information.</p>
      <Suspense fallback={<Loading />}>
        <Await resolve={userInfo}>
          {(data) => <SettingsForm items={data.admin} />}
        </Await>
      </Suspense>
    </main>
  );
};

export default Settings;

export const loader = async ({ request, params }) => {
  const { userId } = params;

  const userInfo = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/admin/info/${userId}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }

    return res.json();
  });

  return defer({ userInfo });
};
