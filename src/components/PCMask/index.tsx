import * as React from "react";
import qrCode from "./SiteQRcode.png";
import "./style.css";

const PCMask: React.FC = () => {
  return (
    <div className="PCMask-container">
      <div className="PCMask-Site-QRcode">
        <img src={qrCode} />
        <p>使用手机扫码进入</p>
      </div>
    </div>
  );
};

export default PCMask;
