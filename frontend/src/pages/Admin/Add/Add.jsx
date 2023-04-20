import { useState } from "react";

import Input from "../../../components/FormElements/Input/Input";
import ImageUpload from "../../../components/FormElements/Multiple Image/ImageUpload";
import useInput from "../../../hooks/use-input";
import { industryList, serviceList } from "./components/data";

import classes from "./components/Add.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allActions } from "../../../store/all-slice";

const Add = () => {
  const [checkedServices, setCheckedServices] = useState([]);
  const [checkedIndustries, setCheckedIndustries] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNotEmpty = (value) => value.trim() !== "";
  const isFile = (value) => value.length !== 0;

  const { value: title, valueChangeHandler: titleChangeHandler } = useInput(
    isNotEmpty,
    ""
  );

  const { value: mainDesc, valueChangeHandler: mainDescChangeHandler } =
    useInput(isNotEmpty, "");

  const { value: desc1, valueChangeHandler: desc1ChangeHandler } = useInput(
    isNotEmpty,
    ""
  );

  const { value: desc2, valueChangeHandler: desc2ChangeHandler } = useInput(
    isNotEmpty,
    ""
  );

  const { value: desc3, valueChangeHandler: desc3ChangeHandler } = useInput(
    isNotEmpty,
    ""
  );

  const { value: images, valueChangeHandler: imageChangeHandler } = useInput(
    isFile,
    ""
  );

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
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQyZmQ4NWRiZWU1ODkxMDI1NWFiZDRiIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxOTExNzE4LCJleHAiOjE2ODI1MTY1MTh9.GZ0op8_oFoC8AoxKrk6JLK5tNJAUs9RhrxXUd924FyA",
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
      <h1>Add Workitem</h1>
      <form onSubmit={formSubmitHandler}>
        <Input
          element="input"
          label="Title"
          name="title"
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={titleChangeHandler}
        />
        <Input
          element="textarea"
          label="Main Description"
          name="main_description"
          value={mainDesc}
          placeholder="Enter Main Description"
          onChange={mainDescChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 1"
          name="description1"
          value={desc1}
          placeholder="Description 1"
          onChange={desc1ChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 2"
          name="description1"
          value={desc2}
          placeholder="Description 2"
          onChange={desc2ChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 3"
          name="description1"
          value={desc3}
          placeholder="Description 3"
          onChange={desc3ChangeHandler}
        />
        <ImageUpload imageChangeHandler={imageChangeHandler} />
        <div className={classes.service_industry}>
          <div>
            <h3>Service:</h3>
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
          <div>
            <h3>Industry:</h3>
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
        <button type="submit">Add WorkItem</button>
      </form>
    </main>
  );
};

export default Add;
