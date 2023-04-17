import {
  Await,
  Link,
  ScrollRestoration,
  defer,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import searchImg from "./components/images/search.svg";

import classes from "./components/Search.module.css";
import useInput from "../../hooks/use-input";
import { Suspense } from "react";
import Loading from "../../components/UIElements/Loading/Loading";

const Search = () => {
  const navigate = useNavigate();

  const { search } = useLoaderData();
  const [searchParams] = useSearchParams();

  const param = searchParams.get("keyword");

  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: textValue,
    isValid: enteredTextIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangedHandler,
    inputBlurHandler: textBlurHandler,
  } = useInput(isNotEmpty, param);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`?keyword=${textValue}`);
  };

  return (
    <main className={classes.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={textValue}
          onChange={textChangedHandler}
          onBlur={textBlurHandler}
          placeholder="Search work..."
        />
        <button disabled={!enteredTextIsValid} type="submit">
          <img src={searchImg} alt="search" />
        </button>
      </form>
      {textHasError && (
        <p className={classes.error_text}>Please enter a valid input</p>
      )}

      <Suspense fallback={<Loading />}>
        <Await resolve={search}>
          {(data) => (
            <main>
              {param && (
                <div className={classes.content}>
                  {data.workItems.length === 0 && (
                    <p className={classes.first}>
                      <span>0 results</span> for {param}
                    </p>
                  )}
                  {data.workItems.length > 0 && (
                    <>
                      <p className={classes.first}>
                        <span>{data.workItems.length} result(s)</span> for{" "}
                        {param}
                      </p>
                      <div className={classes.search_flex}>
                        {data.workItems.map((item, index) => (
                          <div key={index} className={classes.item}>
                            <Link to={`/work-item/${item._id}`}>
                              <img
                                src={`${process.env.REACT_APP_BACKEND_IMAGES}/${item.imageUrl[0]}`}
                                alt={item.title}
                              />
                              <p>{item.title}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </main>
          )}
        </Await>
      </Suspense>
      <ScrollRestoration />
    </main>
  );
};

export default Search;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");

  const search = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/workitems?keyword=${keyword}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ search });
};
