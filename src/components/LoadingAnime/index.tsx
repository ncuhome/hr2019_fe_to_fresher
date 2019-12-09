import * as React from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from './setting';
import './style.css';

interface PropType {
  processValue: number;
}

let lottieRef: HTMLDivElement;

const LoadingAnime: React.FC<PropType> = (props) => {

  const { processValue } = props;

  React.useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef,
      // 使用svg会使图片加载两次，一次是lottie的preload，一次是把图片添加到dom上，还没找到办法解决
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    });
  }, []);

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
  );
};

export default LoadingAnime;
