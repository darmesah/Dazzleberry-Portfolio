import { Link } from "react-router-dom";

import classes from "./WorkItem.module.css";

const WorkItem = ({ title, image, inverse }) => {
  return (
    <li className={`${classes.list_item} ${inverse && classes.inverse} `}>
      <Link to={title}>
        <h5>{title}</h5>
        <img src={image} alt={title} loading="lazy" />
      </Link>
    </li>
  );
};

export default WorkItem;
