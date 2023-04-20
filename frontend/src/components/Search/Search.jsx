import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import search from "./images/search.svg";
import cancel from "./images/cancel.svg";
import { uiActions } from "../../store/ui-slice";

import classes from "./Search.module.css";
import Modal from "../UIElements/Modal/Modal";
import useInput from "../../hooks/use-input";

const Search = () => {
  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: textValue,
    isValid: enteredTextIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangedHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetText,
  } = useInput(isNotEmpty, "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSearch = useSelector((state) => state.ui.searchBarVisible);

  const hideSearchBar = () => {
    dispatch(uiActions.hideSearchBar());
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    resetText();
    hideSearchBar();

    navigate(`search?keyword=${textValue}`);
  };

  return (
    <Modal show={showSearch} onCancel={hideSearchBar}>
      <main
        className={`${classes.container} ${
          showSearch ? classes.show : classes.hide
        }`}
      >
        <div className={classes.cancel}>
          <img onClick={hideSearchBar} src={cancel} alt="cancel" />
        </div>
        <div className={classes.form}>
          <form onSubmit={formSubmitHandler}>
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
        </div>
      </main>
    </Modal>
  );
};

export default Search;
