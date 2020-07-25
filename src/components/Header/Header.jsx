import React from 'react';
import leftArrowIcon from 'assets/left-arrow.png';
import { APP_NAME } from 'configs/environment-variables';

const Header = (props) => {
  const shouldDisplayBackButton = props.history.location.pathname !== '/';
  return (
    <div className="header">
      { shouldDisplayBackButton &&
        <button
          className="header__back-button"
          onClick={props.history.goBack}>
            <img className="album__header-img" alt="back-icon" src={leftArrowIcon} />
        </button>
      }
      <div className="header__app-title">
        {APP_NAME}
      </div>
    </div>
  );
}

export default Header;
