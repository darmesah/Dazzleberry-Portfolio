import { Await, defer, useLoaderData } from "react-router-dom";

import WorkList from "../components/WorkList/WorkList";
import { Suspense } from "react";
import Loading from "../../../components/UIElements/Loading/Loading";

const Service = () => {
  const { services } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={services}>
        {(data) =>
          data.error ? <p>{data.error}</p> : <WorkList items={data.services} />
        }
      </Await>
    </Suspense>
  );
};

export default Service;

export const loader = async () => {
  const services = fetch(`${process.env.REACT_APP_BACKEND_URL}/services`).then(
    (res) => {
      if (!res.ok) {
        return { error: "Something went wrong" };
      }
      return res.json();
    }
  );

  return defer({ services });
};
