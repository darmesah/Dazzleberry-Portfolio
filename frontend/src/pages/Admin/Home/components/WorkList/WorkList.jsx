import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import WorkItem from "../WorkItem/WorkItem";
import Loading from "../../../../../components/UIElements/Loading/Loading";
import Error from "../../../../Error/Error";

import { allActions } from "../../../../../store/all-slice";

import classes from "./WorkList.module.css";

const WorkList = ({ inverse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const page = useSelector((state) => state.all.page);
  const sort = useSelector((state) => state.all.sort);
  const total = useSelector((state) => state.all.total);
  const deleteTrigger = useSelector((state) => state.all.deleteTrigger);
  const workItemsData = useSelector((state) => state.all.workItems);

  // useEffect(() => {
  //   dispatch(allActions.loadWorkItems());
  //   dispatch(allActions.test());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     dispatch(allActions.loadWorkItems());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/workitems?page=${page}&sort=${sort}`
  //     );
  //     const data = await response.json();
  //     setTotal(data.totalWorkItems);
  //     dispatch(allActions.setWorkItems(data.workItems));
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, [page, sort, dispatch]);

  // const loadMoreHandler = () => {
  //   dispatch(allActions.loadMore());
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetch(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/workitems?page=${1}&sort=${sort}`
        );

        const data = await response.json();
        dispatch(allActions.setTotal(data.totalWorkItems));
        dispatch(allActions.setWorkItems(data.workItems));
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, deleteTrigger]);

  const loadMoreHandler = () => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/workitems?page=${page}&sort=${sort}`
      );
      const data = await response.json();
      dispatch(allActions.setTotal(data.totalWorkItems));
      dispatch(allActions.loadMore(data.workItems));
      setIsLoading(false);
    };

    fetchData();
  };

  return (
    <>
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
                <p onClick={loadMoreHandler}>Load More</p>
              </div>
            )}
      </ul>
      {error && <Error />}
    </>
  );
};

export default WorkList;
