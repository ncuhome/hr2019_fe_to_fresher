import * as React from "react";
import Lottie from "react-lottie";
import animationData from "./setting";
import "./style.css";

interface propType {
  isStopped: boolean,
  isPaused: boolean,
  processValue: number
}

export default function LoadingAnime(props:propType) {
  
  const { isStopped, isPaused, processValue } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="loading-container">
      <Lottie 
        options={defaultOptions}
        isStopped={isStopped}
        isPaused={isPaused}
        isClickToPauseDisabled={true}
        width="70vw"
      />
      <div className="process-container">
        <span id="loadingProcess">{processValue}</span>
      </div>
    </div>
  )
}