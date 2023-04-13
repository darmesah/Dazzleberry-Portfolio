import { Await, defer, useLoaderData } from "react-router-dom";

import WorkList from "../components/WorkList/WorkList";
import { Suspense } from "react";
import Loading from "../../../components/UIElements/Loading/Loading";

const Industry = () => {
  const { industries } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={industries}>
        {(data) =>
          data.error ? (
            <p>{data.error}</p>
          ) : (
            <WorkList items={data.industries} />
          )
        }
      </Await>
    </Suspense>
  );
};

export default Industry;

export const loader = async () => {
  const industries = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/industries`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ industries });
};
