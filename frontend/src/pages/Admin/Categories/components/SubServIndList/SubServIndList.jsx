import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import sortImg from "../images/sort.svg";

import SubServIndItem from "../SubServIndItem/SubServIndItem";

import { allActions } from "../../../../../store/all-slice";

import classes from "./SubServIndList.module.css";

const SubServIndList = ({ items }) => {
  const dispatch = useDispatch();
  const { item } = useParams();

  return (
    <>
      <div className={classes.subflex}>
        <p className={classes.title}>
          {item} <span className={classes.length}>{items.length}</span>
        </p>
        <img
          onClick={() => dispatch(allActions.adminSort())}
          src={sortImg}
          alt="sort"
        />
      </div>
      <ul className={classes.items}>
        {items.map((item, index) => (
          <SubServIndItem key={index} {...item} />
        ))}
      </ul>
    </>
  );
};

export default SubServIndList;
