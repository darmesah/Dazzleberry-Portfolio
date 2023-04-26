import { useState } from "react";

import Input from "../../../components/FormElements/Input/Input";
import ImageUpload from "../../../components/FormElements/Multiple Image/ImageUpload";
import useInput from "../../../hooks/use-input";
import { industryList, serviceList } from "./components/data";
import Button from "../../../components/FormElements/Button/Button";

import classes from "./components/Add.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../../../store/all-slice";

const Add = () => {
  const [checkedServices, setCheckedServices] = useState([]);
  const [checkedIndustries, setCheckedIndustries] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const isNotEmpty = (value) => value.trim() !== "";
  const isFile = (value) => value.length === 8;

  const {
    value: title,
    valueChangeHandler: titleChangeHandler,
    isValid: titleIsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: mainDesc,
    valueChangeHandler: mainDescChangeHandler,
    isValid: mainDescIsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: desc1,
    valueChangeHandler: desc1ChangeHandler,
    isValid: desc1IsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: desc2,
    valueChangeHandler: desc2ChangeHandler,
    isValid: desc2IsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: desc3,
    valueChangeHandler: desc3ChangeHandler,
    isValid: desc3IsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: images,
    valueChangeHandler: imageChangeHandler,
    isValid: imagesIsValid,
  } = useInput(isFile, "");

  let formIsValid = false;

  if (
    titleIsValid &&
    mainDescIsValid &&
    desc1IsValid &&
    desc2IsValid &&
    desc3IsValid &&
    imagesIsValid &&
    checkedServices.length > 0 &&
    checkedIndustries.length > 0
  ) {
    formIsValid = true;
  }

  const handleServiceCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedServices((prevValue) => [...prevValue, value]);
    } else {
      setCheckedServices(checkedServices.filter((e) => e !== value));
    }
  };

  const handleIndustryCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedIndustries((prevValue) => [...prevValue, value]);
    } else {
      setCheckedIndustries(checkedIndustries.filter((e) => e !== value));
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const description = [desc1, desc2, desc3];

    const addWorkItem = async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("workDesc", mainDesc);

        for (let i = 0; i < description.length; i++) {
          formData.append("description", description[i]);
        }
        for (let i = 0; i < images.length; i++) {
          formData.append("image", images[i]);
        }
        if (checkedServices.length > 1) {
          for (let i = 0; i < checkedServices.length; i++) {
            formData.append("service", checkedServices[i]);
          }
        } else {
          formData.append("service", checkedServices);
        }
        if (checkedIndustries.length > 1) {
          for (let i = 0; i < checkedIndustries.length; i++) {
            formData.append("industry", checkedIndustries[i]);
          }
        } else {
          formData.append("industry", checkedIndustries);
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/workitem`,
          {
            method: "post",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: formData,
          }
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        navigate("/admin");
        dispatch(allActions.removeItem());
      } catch (error) {
        console.log(error.message);
      }
    };

    addWorkItem();
  };

  return (
    <main className={classes.container}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.header_flex}>
          <div>
            <h1>Add New</h1>
            <p className={classes.p1}>Create a new project.</p>
          </div>
          <div className={classes.can_pub}>
            <button>CANCEL</button>
            <Button disabled={!formIsValid} type="submit">
              PUBLISH
            </Button>
          </div>
        </div>
        <div className={classes.form_flex}>
          <div>
            <Input
              element="input"
              label="Title"
              name="title"
              type="text"
              value={title}
              onChange={titleChangeHandler}
              className={`${classes.title} ${classes.input}`}
            />
            <Input
              element="textarea"
              label="Description"
              name="main_description"
              value={mainDesc}
              onChange={mainDescChangeHandler}
              className={`${classes.textarea}`}
            />
            <ImageUpload imageChangeHandler={imageChangeHandler} />
            <h3>Service Category:</h3>
            <div className={classes.column}>
              {serviceList.map((service, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={service}
                    name={service}
                    value={service}
                    onChange={handleServiceCheck}
                  />
                  <label>{service}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Input
              element="textarea"
              label="Body Copy 1"
              name="description1"
              value={desc1}
              onChange={desc1ChangeHandler}
              className={`${classes.textarea}`}
            />
            <Input
              element="textarea"
              label="Body Copy 2"
              name="description1"
              value={desc2}
              onChange={desc2ChangeHandler}
              className={`${classes.textarea}`}
            />
            <Input
              element="textarea"
              label="Body Copy 3"
              name="description1"
              value={desc3}
              onChange={desc3ChangeHandler}
              className={`${classes.textarea}`}
            />
            <h3>Industry Category:</h3>
            <div className={classes.column}>
              {industryList.map((industry, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={industry}
                    name={industry}
                    value={industry}
                    onChange={handleIndustryCheck}
                  />
                  <label>{industry}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Add;
