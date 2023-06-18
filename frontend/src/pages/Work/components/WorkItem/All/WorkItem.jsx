import { Link } from "react-router-dom";

import classes from "./WorkItem.module.css";

const WorkItem = ({ _id, title, imageUrl, inverse }) => {
  return (
    <li className={`${classes.list_item} ${inverse && classes.inverse} `}>
      <Link to={`/work-item/${_id}`}>
        <h5>{title}</h5>
        <div className={classes.img}>
          <img
            src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[0]}`}
            alt={title}
            loading="lazy"
          />
        </div>
      </Link>
    </li>
  );
};

export default WorkItem;
