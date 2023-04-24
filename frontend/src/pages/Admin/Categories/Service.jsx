import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import Loading from "../../../components/UIElements/Loading/Loading";
import ServIndList from "./components/ServIndList/ServIndList";

const CategoryService = () => {
  const { services } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={services}>
        {(data) => <ServIndList items={data.services} />}
      </Await>
    </Suspense>
  );
};

export default CategoryService;

export const loader = async () => {
  const services = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/admin/services`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ services });
};
