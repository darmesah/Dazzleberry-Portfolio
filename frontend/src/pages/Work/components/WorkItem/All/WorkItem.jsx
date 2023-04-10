import { Link } from "react-router-dom";

import classes from "./WorkItem.module.css";

const WorkItem = ({ title, link, image, inverse }) => {
  return (
    <li className={`${classes.list_item} ${inverse && classes.inverse} `}>
      <Link to={`/work-item/${link}`}>
        <h5>{title}</h5>
        <img src={image} alt={title} loading="lazy" />
      </Link>
    </li>
  );
};

export default WorkItem;
