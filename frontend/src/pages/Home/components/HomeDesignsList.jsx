import { Link } from "react-router-dom";

import classes from "./HomeDesignsList.module.css";

const HomeDesignList = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d511da67b90ea3073db5c9">
            <img src="/images/home/1.jpg" alt="pawfinder" />
            <h2>Pawfinder</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d50fe267b90ea3073db5ba">
            <img src="/images/home/2.jpeg" alt="landvault" />
            <h2>Landvault</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d4d08267b90ea3073db5b3">
            <img src="/images/home/3.jpg" alt="finimedia" />
            <h2>Finimedia</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d4bd2467b90ea3073db5ac">
            <img src="/images/home/4.jpg" alt="myAsoebi" />
            <h2>MyAsoebi</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64cea60767b90ea3073db4d2">
            <img src="/images/home/5.jpeg" alt="alarmeet" />
            <h2>Alarmeet</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64ce2f7667b90ea3073db4a4">
            <img src="/images/home/6.jpeg" alt="Ebenezer Victoria Foundation" />
            <h2>Ebenezer Victoria Foundation</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64cd56d367b90ea3073db459">
            <img src="/images/home/7.jpeg" alt="heyWrita" />
            <h2>HeyWrita</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64cd470867b90ea3073db450">
            <img src="/images/home/8.jpeg" alt="aihoun" />
            <h2>Aihoun</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64cd382467b90ea3073db447">
            <img src="/images/home/9.jpeg" alt="Orinda Fresh" />
            <h2>Orinda Fresh</h2>
          </Link>
        </div>
        <div className={classes.designitem}>
          <Link to="https://dazzleberrydesigns.com/work-item/64cd22d867b90ea3073db410">
            <img src="/images/home/10.jpg" alt="2121 The Brand" />
            <h2>2121 The Brand</h2>
          </Link>
        </div>
      </div>
      <div className={classes.container_d}>
        <div className={classes.designitem_d}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d511da67b90ea3073db5c9">
            <img src="/images/home/1.jpg" alt="pawfinder" />
            <h2>Pawfinder</h2>
          </Link>
        </div>
        <div className={classes.designitem_d}>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64d50fe267b90ea3073db5ba">
              <img src="/images/home/2.jpeg" alt="landvault" />
              <h2>Landvault</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64d4bd2467b90ea3073db5ac">
              <img src="/images/home/4.jpg" alt="myAsoebi" />
              <h2>MyAsoebi</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64ce2f7667b90ea3073db4a4">
              <img
                src="/images/home/6.jpeg"
                alt="Ebenezer Victoria Foundation"
              />
              <h2>Ebenezer Victoria Foundation</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64cea60767b90ea3073db4d2">
              <img src="/images/home/5.jpeg" alt="alarmeet" />
              <h2>Alarmeet</h2>
            </Link>
          </div>
        </div>
        <div className={classes.designitem_d}>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64cd56d367b90ea3073db459">
              <img src="/images/home/7.jpeg" alt="heyWrita" />
              <h2>HeyWrita</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64cd470867b90ea3073db450">
              <img src="/images/home/8.jpeg" alt="aihoun" />
              <h2>Aihoun</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64cd382467b90ea3073db447">
              <img src="/images/home/9.jpeg" alt="Orinda Fresh" />
              <h2>Orinda Fresh</h2>
            </Link>
          </div>
          <div className={classes.designitem_d_c}>
            <Link to="https://dazzleberrydesigns.com/work-item/64cd22d867b90ea3073db410">
              <img src="/images/home/10.jpg" alt="2121 The Brand" />
              <h2>2121 The Brand</h2>
            </Link>
          </div>
        </div>
        <div className={classes.designitem_d}>
          <Link to="https://dazzleberrydesigns.com/work-item/64d4d08267b90ea3073db5b3">
            <img src="/images/home/3.jpg" alt="finimedia" />
            <h2>Finimedia</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeDesignList;
