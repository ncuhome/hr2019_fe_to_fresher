import * as React from "react";
import anime from "animejs";
import Lottie from "react-lottie";
import animationData from "../../components/LoadingAnime/setting";
import config from "../../config";
import "./style.css";

const { useState, useEffect } = React;
const { indexText } = config;

export default function Home() {

  const [ isStopped, setIsStopped ] = useState(false);
  const [ isPaused, setIsPaused ] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    anime({
      targets: "#loadingProcess",
      innerHTML: [0,100],
      easing: "linear",
      duration:10000,
      round: 1
    })
  },[]);

  return (
    <div className="home-container">
      <div className="loading-container">
        <Lottie 
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={isPaused}
          isClickToPauseDisabled={true}
          width="70vw"
        />
        <div className="process-container">
          <span id="loadingProcess"></span>
        </div>
      </div>
      <div className="home-introduction-container">
        <p className="home-introduction-headline">ABOUT NCUHOME</p>
        {indexText.map((line) => (<p>{line}</p>))}
      </div>
    </div>
  )
}