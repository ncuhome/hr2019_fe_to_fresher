import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import enquire from 'enquire.js';
import Home from './pages/home';
import ProductIntro from './pages/productintro';
import GroupIntro from './pages/groupintro';
import Application from './pages/application';
import './App.css';
import config from './config';


const { useState, useEffect } = React;
const { mobileQuery } = config;

export default function App() {

  const [ isMobile, setIsMobile ] = useState(true);

  useEffect(() => {
    enquire.register(mobileQuery,{
      match: () => {
        setIsMobile(true);
      },
      unmatch: () => {
        setIsMobile(false);
      }
    });
    return () => {
      enquire.unregister(mobileQuery);
    }
  },[]);

  return isMobile ? (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductIntro} />
      <Route path="/group" component={GroupIntro} />
      <Route path="/application" component={Application} />
    </Router>
  ) :
  (
    <div>请使用移动端打开</div>
  )
};
