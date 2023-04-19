import {
  Await,
  ScrollRestoration,
  defer,
  useLoaderData,
} from "react-router-dom";

import SubList from "../components/SubItems/SubList/SubList";
import { Suspense } from "react";
import Loading from "../../../components/UIElements/Loading/Loading";
import Error from "../../Error/Error";

const ServiceSub = () => {
  const { service } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={service}>
          {(data) =>
            data.error ? <Error /> : <SubList items={data.workItems} />
          }
        </Await>
      </Suspense>
      <ScrollRestoration />
    </>
  );
};

export default ServiceSub;

export const loader = async ({ request, params }) => {
  const { item } = params;

  const service = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/service/${item}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ service });
};
