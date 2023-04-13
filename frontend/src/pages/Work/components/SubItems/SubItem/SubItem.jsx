import { Link } from "react-router-dom";

import classes from "./SubItem.module.css";

const SubItem = ({ _id, title, imageUrl }) => {
  return (
    <li className={classes.list_item}>
      <Link to={`/work-item/${_id}`}>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[0]}`}
          alt={title}
          loading="lazy"
        />
        <h5>{title}</h5>
      </Link>
    </li>
  );
};

export default SubItem;
