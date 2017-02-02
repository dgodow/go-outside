import React from 'react';

import {connect} from 'react-redux';

// Components
import Status from './Status';
import User from './User';
import Weather from './Weather';
import SettingsModal from './SettingsModal';

const bg = Math.floor(Math.random() * (8 - 1)) + 1;

const style = {
  background: {
    width: 100 + '%',
    height: 100 + 'vh',
    background: `url("images/wallpapers/${bg}.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  }
};

export function Main (props) {

  const {status, time, weather, auth} = props;

  return (
    <div style={style.background} className="row">
      <div className="row">
        <User user={auth} />
        <Weather weather={weather} />
      </div>
      <Status status={status} time={time} />
      <div>
        <SettingsModal />
      </div>
    </div>
  );
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
