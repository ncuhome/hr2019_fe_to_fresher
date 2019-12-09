import * as React from 'react';
import './style.css';

const SiteQRcode = require('./SiteQRcode.png');

const PCMask: React.FC = () => {
  return (
    <div className="PCMask-container">
      <div className="PCMask-Site-QRcode">
        <img src={SiteQRcode} />
        <p>使用手机扫码进入</p>
      </div>
    </div>
  );
};

export default PCMask;
