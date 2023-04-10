import { ScrollRestoration } from "react-router-dom";

import allItems from "./components/data";

import SubList from "../components/SubItems/SubList/SubList";

const IndustrySub = () => {
  return (
    <>
      <SubList items={allItems} />
      <ScrollRestoration />
    </>
  );
};

export default IndustrySub;
