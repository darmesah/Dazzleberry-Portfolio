import finimedia from './images/finimedia.jpg';
import finimedia2 from './images/finimedia2.jpg';
import academy from './images/academy.jpg';
import alternatio from './images/alternatio.jpg';
import alternatio2 from './images/alternatio2.jpg';
import baby from './images/baby.jpg';
import educore from './images/educore.jpg';
import everything from './images/everything.jpg';
import heywrita from './images/heywrita.jpg';
import heywrita2 from './images/heywrita2.jpg';
import izyfood from './images/izyfood.jpg';
import merit from './images/merit.jpg';
import pawfinder from './images/pawfinder.jpg';
import shopcademy from './images/shopcademy.jpg';
import chat from './images/chat.jpg';
import roster from './images/roster.jpg';
import alarmeet from './images/alarmeet.jpg';
import edfog from './images/edfog.jpg';

import classes from './HomeDesignsList.module.css';

const HomeDesignList = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.designitem}>
          <img src={finimedia} alt="finimedia" />
          <h2>Finimedia</h2>
        </div>
        <div className={classes.designitem}>
          <img src={pawfinder} alt="pawfinder" />
          <h2>Pawfinder</h2>
        </div>
        <div className={classes.designitem}>
          <img src={alternatio} alt="alternatio" />
          <h2>Alternatio Navitas</h2>
        </div>
        <div className={classes.designitem}>
          <img src={baby} alt="baby" />
          <h2>Baby Republic</h2>
        </div>
        <div className={classes.designitem}>
          <img src={everything} alt="everything" />
          <h2>Everything Beautiful</h2>
        </div>
        <div className={classes.designitem}>
          <img src={merit} alt="merit" />
          <h2>MeritFX</h2>
        </div>
        <div className={classes.designitem}>
          <img src={heywrita} alt="heywrita" />
          <h2>Heywrita</h2>
        </div>
        <div className={classes.designitem}>
          <img src={shopcademy} alt="shopcademy" />
          <h2>Shopcademy</h2>
        </div>
        <div className={classes.designitem}>
          <img src={izyfood} alt="izyfood" />
          <h2>Izy Food Hub</h2>
        </div>
        <div className={classes.designitem}>
          <img src={academy} alt="academy" />
          <h2>Academy Stack</h2>
        </div>
        <div className={classes.designitem}>
          <img src={educore} alt="educore" />
          <h2>Educore</h2>
        </div>
        <div className={classes.designitem}>
          <img src={chat} alt="chat" />
          <h2>The Chat Box</h2>
        </div>
      </div>
      <div className={classes.container_d}>
        <div className={classes.designitem_d}>
          <img src={finimedia2} alt="finimedia" />
          <h2>Finimedia</h2>
        </div>
        <div className={classes.designitem_d}>
          <div className={classes.designitem_d_c}>
            <img src={pawfinder} alt="pawfinder" />
            <h2>Pawfinder</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={baby} alt="baby" />
            <h2>Baby Republic</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={merit} alt="merit" />
            <h2>MeritFX</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={everything} alt="everything" />
            <h2>Everything Beautiful</h2>
          </div>
        </div>
        <div className={classes.designitem_d}>
          <div className={classes.designitem_d_c}>
            <img src={roster} alt="roster" />
            <h2>Roster</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={shopcademy} alt="shopcademy" />
            <h2>Shopcademy</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={izyfood} alt="izyfood" />
            <h2>Izy Food Hub</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={educore} alt="educore" />
            <h2>Educore</h2>
          </div>
        </div>
        <div className={classes.designitem_d}>
          <img src={alternatio2} alt="alternatio" />
          <h2>Alternatio Navitas</h2>
        </div>
        <div className={classes.designitem_d}>
          <img src={heywrita2} alt="heywrita" />
          <h2>Heywrita</h2>
        </div>
        <div className={classes.designitem_d}>
          <div className={classes.designitem_d_c}>
            <img src={academy} alt="academy" />
            <h2>Academy Stack</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={alarmeet} alt="alarmeet" />
            <h2>Alarmeet</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={chat} alt="chat" />
            <h2>The Chat Box</h2>
          </div>
          <div className={classes.designitem_d_c}>
            <img src={edfog} alt="edfog" />
            <h2>EDFOG</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDesignList;
