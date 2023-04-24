import ServIndItem from "../ServIndItem/ServIndItem";

import classes from "./ServIndList.module.css";

const ServIndList = ({ items }) => {
  return (
    <ul className={classes.items}>
      {items.map((item, index) => (
        <ServIndItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default ServIndList;
