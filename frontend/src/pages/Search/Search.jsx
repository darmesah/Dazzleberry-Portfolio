import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import search from './components/images/search.svg';
import data from './components/data';

import classes from './components/Search.module.css';
import useInput from '../../hooks/use-input';

const Search = () => {
  const isNotEmpty = (value) => value.trim() !== '';

  const {
    value: textValue,
    isValid: enteredTextIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangedHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetText,
  } = useInput(isNotEmpty);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const param = searchParams.get('keyword');
  console.log(param);

  const handleSubmit = (e) => {
    e.preventDefault();

    resetText();

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
          <img src={search} alt="search" />
        </button>
      </form>
      {textHasError && (
        <p className={classes.error_text}>Please enter a valid input</p>
      )}
      {param && (
        <div className={classes.content}>
          {data.length === 0 && (
            <p className={classes.first}>
              <span>0 results</span> for {param}
            </p>
          )}
          {data.length > 0 && (
            <>
              <p className={classes.first}>
                <span>7 results</span> for {param}
              </p>
              <div className={classes.search_flex}>
                {data.map((item, index) => (
                  <div key={index} className={classes.item}>
                    <Link>
                      <img src={item.image} alt={item.title} />
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
  );
};

export default Search;
