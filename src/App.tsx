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
const { desktopQuery } = config;

export default function App() {

  const [ isMobile, setIsMobile ] = useState(true);

  useEffect(() => {
    const handler = {
      match: () => {
        setIsMobile(false);
      },
      unmatch: () => {
        setIsMobile(true);
      }
    };
    enquire.register(desktopQuery, handler);
    return () => {
      enquire.unregister(desktopQuery, handler);
    };
  },[ isMobile ]);

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
