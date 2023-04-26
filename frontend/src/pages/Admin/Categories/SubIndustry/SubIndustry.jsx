import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SubServIndList from "../components/SubServIndList/SubServIndList";

import classes from "./SubIndustry.module.css";
import { useSelector } from "react-redux";

const CategorySubIndustry = () => {
  const [items, setItems] = useState([]);

  const { item } = useParams();

  const sort = useSelector((state) => state.all.sort);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/industry/${item}?sort=${sort}`
        );
        const data = await response.json();
        setItems(data.workItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [item, sort]);

  return (
    <main className={classes.main}>
      <h1>Projects</h1>
      <p>Create, edit, and manage the projects on the site.</p>
      <div className={classes.cont}>
        <SubServIndList items={items} />
      </div>
    </main>
  );
};

export default CategorySubIndustry;
