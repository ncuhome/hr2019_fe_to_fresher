import * as React from 'react';
import './style.css';

const arrow = require("../../assets/svg/back_arrow.svg");

const BackArrow = (props:any) => {
  return (
    <div className="back-arrow-container" onClick={props.onClick}>
      <img src={arrow} alt="返回"/>
    </div>
  )
}

export default BackArrow;