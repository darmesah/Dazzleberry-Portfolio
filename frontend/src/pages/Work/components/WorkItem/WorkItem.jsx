import { Link } from "react-router-dom";

import classes from "./WorkItem.module.css";

const WorkItem = ({ title, image }) => {
  return (
    <li className={`${classes.list_item}`}>
      <Link to={title}>
        <h5>{title}</h5>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${image}`}
          alt={title}
          loading="lazy"
        />
      </Link>
    </li>
  );
};

export default WorkItem;
