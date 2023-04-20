import { useNavigate } from "react-router-dom";
import Input from "../../../../components/FormElements/Input/Input";
import useInput from "../../../../hooks/use-input";
import { useDispatch } from "react-redux";
import { allActions } from "../../../../store/all-slice";

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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQyZmQ4NWRiZWU1ODkxMDI1NWFiZDRiIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxOTExNzE4LCJleHAiOjE2ODI1MTY1MTh9.GZ0op8_oFoC8AoxKrk6JLK5tNJAUs9RhrxXUd924FyA",
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
    <main>
      <form onSubmit={updateHandler}>
        <Input
          element="input"
          label="Title"
          name="title"
          type="text"
          value={editTitle}
          placeholder="Enter Title"
          onChange={titleChangeHandler}
        />
        <Input
          element="textarea"
          label="Main Description"
          name="main_description"
          value={editWorkDesc}
          placeholder="Enter Main Description"
          onChange={workDescChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 1"
          name="description1"
          value={desc1}
          placeholder="Enter Description 1"
          onChange={desc1ChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 2"
          name="description2"
          value={desc2}
          placeholder="Enter Description 2"
          onChange={desc2ChangeHandler}
        />
        <Input
          element="textarea"
          label="Description 3"
          name="description3"
          value={desc3}
          placeholder="Enter Description 3"
          onChange={desc3ChangeHandler}
        />
        <button type="submit">Update Work Item</button>
      </form>
    </main>
  );
};

export default Item;
