import React from 'react'
import Header from './components/Header'
import { Route, Switch, withRouter } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import MovieDetailPage from 'pages/MovieDetailPage'

const App = (props) => {
  return(
    <React.Fragment>
      <Header {...props} />
      <div className='body-container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/movie/:id' component={MovieDetailPage} />
          <Route component={() => <h1>Oops! Page not found.</h1>} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default withRouter(App);