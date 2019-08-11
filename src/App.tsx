import * as React from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { History } from 'history';
import enquire from 'enquire.js';
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

const Container = (props:{history:History,children?:any}) => {

  const { history } = props;

  useEffect(() => {
    ReactGA.pageview(history.location.pathname);
    const unlisten = history.listen((location) => {
      ReactGA.pageview(location.pathname);
    });
    return () => {
      unlisten();
    }
  },[]);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}
const RouteContainer = withRouter(Container);

const App = () => {

  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    const handler = {
      match: () => {
        setIsMobile(true);
      },
      unmatch: () => {
        setIsMobile(false);
      }
    };
    enquire.register(mobileQuery, handler);
    return () => {
      enquire.unregister(mobileQuery, handler);
    };
  },[ isMobile ]);

  return isMobile ? (
    <Router>
      <RouteContainer>
        <Route exact path="/" component={Home} />
        <Route path="/product" component={ProductIntro} />
        <Route path="/department" component={DepartmentsIntro} />
        <Route path="/application" component={Application} />
      </RouteContainer>
    </Router>
  ) :
  (
    <PCMask />
  )
};

export default App;
