import * as React from 'react';
import enquire from 'enquire.js';
import Introduce from './pages/introduce';
import Application from './pages/application';
import GroupIntro from './pages/groupintro';
import './App.css';
import config from './config';


const { useState, useEffect } = React;
const { mobileQuery } = config;

export default function App() {

  const [ isMobile, setIsMobile ] = useState(false);

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
    // <Introduce isMobile={isMobile}/>
    <Application />
    // <GroupIntro />
  ) :
  (
    <div>请使用移动端打开</div>
  )
};
