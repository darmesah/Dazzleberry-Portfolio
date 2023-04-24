import { Link } from "react-router-dom";
import classes from "./ServIndItem.module.css";

const ServIndItem = ({ item }) => {
  return (
    <li className={classes.list_item}>
      <Link to={item}>{item}</Link>
    </li>
  );
};

export default ServIndItem;
