import * as React from "react";
import lottie from "lottie-web";
import animationData from "./setting";
import "./style.css";

interface propType {
  processValue: number,
}

let lottieRef:HTMLDivElement;

export default function LoadingAnime(props:propType) {
  
  const { processValue } = props;

  React.useEffect( () => {
    lottie.loadAnimation({
      container: lottieRef,
      // 使用svg会使图片加载两次，一次是lottie的preload，一次是把图片添加到dom上，还没找到办法解决
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  },[])

  return (
    <div className="loading-container">
      <div
        className="lottie-contianer"
        ref={(myRef) => { lottieRef = myRef }}
      />
      <div className="process-container">
        <span id="loadingProcess">{processValue}</span>
      </div>
    </div>
  )
}