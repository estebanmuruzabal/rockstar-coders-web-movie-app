import React from 'react';
import Header from './components/Header';
import Routes from 'routes';
import { withRouter } from 'react-router-dom';

const App = (props) => {
  return(
    <React.Fragment>
      <React.StrictMode>
        <Header {...props} />
        <div className="body-container">
          <Routes />
        </div>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default withRouter(App);