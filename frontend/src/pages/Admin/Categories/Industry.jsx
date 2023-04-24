import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import Loading from "../../../components/UIElements/Loading/Loading";
import ServIndList from "./components/ServIndList/ServIndList";

const CategoryIndustry = () => {
  const { industries } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={industries}>
        {(data) => <ServIndList items={data.industries} />}
      </Await>
    </Suspense>
  );
};

export default CategoryIndustry;

export const loader = async () => {
  const industries = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/admin/industries`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ industries });
};
