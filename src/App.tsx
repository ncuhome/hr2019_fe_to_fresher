import * as React from 'react';
import enquire from 'enquire.js';
import Introduce from './pages/introduce/introduce';
import './App.css';
import config from './config';
import Application from './pages/application/application';

const { useState, useEffect } = React;
const { mobileQuery } = config;

export default function App() {

  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    enquire.register(mobileQuery,{
      match: () => {
        setIsMobile(true);
        console.log(isMobile);
      },
      unmatch: () => {
        setIsMobile(false);
        console.log(isMobile);
      }
    });
    return () => {
      enquire.unregister(mobileQuery);
    }
  })

  return isMobile ? (
    // <Introduce isMobile={isMobile}/>
    <Application />
  ) :
  (
    <div>请使用移动端打开</div>
  )
};
