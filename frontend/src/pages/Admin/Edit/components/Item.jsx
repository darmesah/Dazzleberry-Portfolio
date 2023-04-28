import { useNavigate } from "react-router-dom";
import Input from "../../../../components/FormElements/Input/Input";
import useInput from "../../../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../../../../store/all-slice";

import classes from "./Item.module.css";
import Button from "../../../../components/FormElements/Button/Button";

const Item = ({ items }) => {
  const { _id, title, workDesc, description } = items;

  const isNotEmpty = (value) => value.trim() !== "";

  const { value: editTitle, valueChangeHandler: titleChangeHandler } = useInput(
    isNotEmpty,
    title
  );

  const { value: editWorkDesc, valueChangeHandler: workDescChangeHandler } =
    useInput(isNotEmpty, workDesc);

  const { value: desc1, valueChangeHandler: desc1ChangeHandler } = useInput(
    isNotEmpty,
    description[0]
  );

  const { value: desc2, valueChangeHandler: desc2ChangeHandler } = useInput(
    isNotEmpty,
    description[1]
  );

  const { value: desc3, valueChangeHandler: desc3ChangeHandler } = useInput(
    isNotEmpty,
    description[2]
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const updateItemData = {
    title: editTitle,
    workDesc: editWorkDesc,
    description: [desc1, desc2, desc3],
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const updateItem = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/workitem/${_id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updateItemData),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        navigate("/admin");
        dispatch(allActions.removeItem());
      }
    };

    updateItem();
  };

  return (
    <main className={classes.container}>
      <h1 className={classes.h1}>Edit Project</h1>
      <p className={classes.p1}>Edit a project</p>
      <form onSubmit={updateHandler}>
        <Input
          element="input"
          label="Title"
          name="title"
          type="text"
          value={editTitle}
          placeholder="Enter Title"
          onChange={titleChangeHandler}
          className={classes.input}
        />
        <Input
          element="textarea"
          label="Main Description"
          name="main_description"
          value={editWorkDesc}
          placeholder="Enter Main Description"
          onChange={workDescChangeHandler}
          className={classes.textarea}
        />
        <Input
          element="textarea"
          label="Description 1"
          name="description1"
          value={desc1}
          placeholder="Enter Description 1"
          onChange={desc1ChangeHandler}
          className={classes.textarea}
        />
        <Input
          element="textarea"
          label="Description 2"
          name="description2"
          value={desc2}
          placeholder="Enter Description 2"
          onChange={desc2ChangeHandler}
          className={classes.textarea}
        />
        <Input
          element="textarea"
          label="Description 3"
          name="description3"
          value={desc3}
          placeholder="Enter Description 3"
          onChange={desc3ChangeHandler}
          className={classes.textarea}
        />
        <Button type="submit">UPDATE WORK</Button>
      </form>
    </main>
  );
};

export default Item;
