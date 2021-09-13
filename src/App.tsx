import * as React from 'react';
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Media from 'react-media';
import * as ReactGA from 'react-ga';
import PCMask from '././components/PCMask';
import Home from './pages/home';
import ProductIntro from './pages/productintro';
import DepartmentsIntro from './pages/departmentintro';
import Application from './pages/application';
import Success from './pages/success'
import comments from './pages/comments';
import checkProgress from './pages/checkProgress';
import './App.css';
import config from './config';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
        transition={Slide}
        style={{textAlign:'center'}}
      />
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
              <Route path="/success" component={Success} />
              <Route path="/comments" component={comments} />
              <Route path="/checkProgress" component={checkProgress} />
            </RouteContainer>
          </Router>
        ) : (
          <PCMask />
        ))}
    </Media>
  );
};

export default App;
