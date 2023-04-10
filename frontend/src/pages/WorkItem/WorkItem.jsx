import { ScrollRestoration } from "react-router-dom";

import workItem from "./data";

import classes from "./components/WorkItem.module.css";

const WorkItem = () => {
  const { title, service, mainDesc, images, descriptions } = workItem;

  return (
    <>
      <main className={classes.container}>
        <div className={classes.header}>
          <div className={classes.header_1}>
            <h1>{title}</h1>
            {service.map((item, index) => (
              <p key={index}>
                {item}
                {index < service.length - 1 && ", "}
              </p>
            ))}
          </div>
          <div className={classes.header_2}>{mainDesc}</div>
        </div>
        <div className={classes.body}>
          <img src={images[0]} alt="image_1" />
          <div className={classes.img_2_3}>
            <div>
              <img src={images[1]} alt="image_2" />
            </div>
            <div>
              <img src={images[2]} alt="image_3" />
            </div>
          </div>
          <p className={classes.description_1}>{descriptions[0]}</p>
          <img src={images[3]} alt="image_4" />
          <div className={classes.text_img}>
            <div className={classes.text_img_txt}>{descriptions[1]}</div>
            <div className={classes.text_img_img}>
              <img src={images[4]} alt="image_5" />
            </div>
          </div>
          <img src={images[5]} alt="image_6" />
          <div className={classes.text_img}>
            <div className={classes.text_img_img}>
              <img src={images[6]} alt="image_7" />
            </div>
            <div className={classes.text_img_txt}>{descriptions[2]}</div>
          </div>
          <img src={images[7]} alt="image_8" />
        </div>
        <div className={classes.next}>
          <p className={classes.next_p}>Next Project</p>
          <div className={classes.header}>
            <div className={classes.header_1}>
              <h1>{title}</h1>
              {service.map((item, index) => (
                <p key={index}>
                  {item}
                  {index < service.length - 1 && ", "}
                </p>
              ))}
            </div>
            <div className={classes.header_2}>{mainDesc}</div>
          </div>
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
};

export default WorkItem;
