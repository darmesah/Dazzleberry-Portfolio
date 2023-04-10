import { useParams } from "react-router-dom";
import SubItem from "../SubItem/SubItem";

import classes from "./SubList.module.css";

const SubList = ({ items, inverse }) => {
  const { item } = useParams();

  return (
    <ul className={classes.list_cont}>
      <h3>{item}</h3>
      {items.map((item, index) => (
        <SubItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default SubList;
