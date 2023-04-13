import WorkItem from "../WorkItem/WorkItem";

import classes from "./WorkList.module.css";

const WorkList = ({ items, inverse }) => {
  return (
    <ul className={classes.list_cont}>
      {items.map((item, index) => (
        <WorkItem key={index} {...item} inverse={inverse} />
      ))}
    </ul>
  );
};

export default WorkList;
