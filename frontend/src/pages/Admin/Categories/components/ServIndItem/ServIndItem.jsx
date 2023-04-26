import { Link } from "react-router-dom";
import classes from "./ServIndItem.module.css";

const ServIndItem = ({ title, amount }) => {
  return (
    <li className={classes.list_item}>
      <Link to={title}>{title}</Link> <span>{amount}</span>
    </li>
  );
};

export default ServIndItem;
