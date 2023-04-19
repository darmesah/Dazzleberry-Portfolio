import { Link } from "react-router-dom";
import classes from "./Item.module.css";

const Item = ({ items, next }) => {
  const { title, workDesc, imageUrl, service, description, industry } = items;

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <div className={classes.header_1}>
          <h1>{title}</h1>
          {service.map((item, index) => (
            <Link to={`/work/service/${item}`} key={index}>
              {item}
              {index < service.length - 1 && ", "}
            </Link>
          ))}
          {industry.map((item, index) => (
            <Link to={`/work/industry/${item}`} key={index}>
              , {item}
            </Link>
          ))}
        </div>
        <div className={classes.header_2}>{workDesc}</div>
      </div>
      <div className={classes.body}>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[0]}`}
          alt="image_1"
        />
        <div className={classes.img_2_3}>
          <div>
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[1]}`}
              alt="image_2"
            />
          </div>
          <div>
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[2]}`}
              alt="image_3"
            />
          </div>
        </div>
        <p className={classes.description_1}>{description[0]}</p>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[3]}`}
          alt="image_4"
        />
        <div className={classes.text_img}>
          <div className={classes.text_img_txt}>{description[1]}</div>
          <div className={classes.text_img_img}>
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[4]}`}
              alt="image_5"
            />
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[5]}`}
          alt="image_6"
        />
        <div className={classes.text_img}>
          <div className={classes.text_img_img}>
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[6]}`}
              alt="image_7"
            />
          </div>
          <div className={classes.text_img_txt}>{description[2]}</div>
        </div>
        <img
          src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[7]}`}
          alt="image_8"
        />
      </div>
      <div className={classes.next}>
        <Link to={`/work-item/${next._id}`}>
          <p className={classes.next_p}>Next Project</p>
          <div className={classes.header}>
            <div className={classes.header_1}>
              <h1>{next.title}</h1>
              {service.map((item, index) => (
                <p key={index}>
                  {item}
                  {index < service.length - 1 && ", "}
                </p>
              ))}
            </div>
            <div className={classes.header_2}>{next.workDesc}</div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Item;
