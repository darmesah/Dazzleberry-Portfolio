import { useEffect, useState } from "react";
import WorkItem from "../../WorkItem/All/WorkItem";

import classes from "./WorkList.module.css";
import Loading from "../../../../../components/UIElements/Loading/Loading";

const WorkList = ({ inverse }) => {
  const [workItemsData, setWorkItemsData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/workitems?page=${page}&sort${"s"}`
      );
      const data = await response.json();
      setTotal(data.totalWorkItems);
      setWorkItemsData([...workItemsData, ...data.workItems]);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  return (
    <ul className={classes.list_cont}>
      {workItemsData.map((item, index) => (
        <WorkItem key={index} {...item} inverse={inverse} />
      ))}
      {isLoading && (
        <div className={classes.loading}>
          <Loading />
        </div>
      )}
      {total === workItemsData.length
        ? ""
        : !isLoading && (
            <div className={classes.load_more}>
              <button onClick={loadMoreHandler}>Load More</button>
            </div>
          )}
    </ul>
  );
};

export default WorkList;
