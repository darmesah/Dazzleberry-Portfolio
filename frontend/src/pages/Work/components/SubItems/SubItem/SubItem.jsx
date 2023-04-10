import { Link } from "react-router-dom";

import classes from "./SubItem.module.css";

const SubItem = ({ title, link, image, inverse }) => {
  return (
    <li className={classes.list_item}>
      <Link to={`/work-item/${link}`}>
        <img src={image} alt={title} loading="lazy" />
        <h5>{title}</h5>
      </Link>
    </li>
  );
};

export default SubItem;
