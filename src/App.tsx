import * as React from 'react';
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Media from 'react-media';
import * as ReactGA from 'react-ga';
import PCMask from '././components/PCMask';
import Home from './pages/home';
import ProductIntro from './pages/productintro';
import DepartmentsIntro from './pages/departmentintro';
import Application from './pages/application';
import './App.css';
import config from './config';


const { useState, useEffect } = React;
const { mobileQuery, gaTrackingCode } = config;

ReactGA.initialize(gaTrackingCode);

const Container: React.FC<RouteComponentProps> = props => {

  const { history } = props;

  useEffect(() => {
    ReactGA.pageview(history.location.pathname);
    const unlisten = history.listen((location) => {
      ReactGA.pageview(location.pathname);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <>
      {props.children}
    </>
  );
};
const RouteContainer = withRouter(Container);

const App: React.FC = () => {
  return (
    <Media query={mobileQuery}>
      {matches => (
        matches ? (
          <Router>
            <RouteContainer>
              <Route exact path="/" component={Home} />
              <Route path="/product" component={ProductIntro} />
              <Route path="/department" component={DepartmentsIntro} />
              <Route path="/application" component={Application} />
            </RouteContainer>
          </Router>
        ) : (
          <PCMask />
        ))}
    </Media>
  );
};

export default App;
