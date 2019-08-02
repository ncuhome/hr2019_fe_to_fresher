import * as React from "react";
import anime from 'animejs';
import { withRouter } from "react-router";
import LoadingAnime from "../../components/LoadingAnime";
import loadImage from "../../image";
import config from "../../config";
import "./style.css";

const { useState, useEffect } = React;
const { indexText } = config;

function Home(props:any) {

  const [ isAnimeing, setIsAnimeing ] = useState(false);
  const [ isStopped, setIsStopped ] = useState(false);
  const [ isPaused, setIsPaused ] = useState(false);
  const [ processValue, setProcessValue ] = useState(0);
  const [ unmount, setUnmount ] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsAnimeing(true);
    if (!isAnimeing) {
      const changeAnime = anime.timeline({
        autoplay: true,
        complete: () => {
          props.history.push("/product");
        }
      });
      changeAnime.add({
        targets: ".loading-container,.home-guide-container,.home-introduction-container",
        duration: 2000,
        opacity: [1,0],
        easing: "linear"
      })
      .add({
        targets: ".home-hidden-container",
        duration: 2000,
        opacity: [0,1],
        easing: "linear",
        endDelay: 1000,
      })
      .add({
        targets: ".home-hidden-container",
        duration: 1000,
        opacity: [1,0],
        easing: "linear",
      });
    }
  }

  useEffect(() => {
    const handleTouch = (e:TouchEvent) => { e.preventDefault(); };
    document.body.addEventListener("touchmove", handleTouch, { passive:false });
    return () => {
      document.body.removeEventListener("touchmove", handleTouch)
    }
  },[]);

  useEffect(() => {
    setUnmount(false);
    anime({
      targets: ".home-introduction-container",
      duration: 1000,
      opacity: [0,1],
      easing: "linear",
    });
    const callback = (count:number,length:number) => {
      const value = Math.round((count/length)*100);
      // 解决组件销毁的时候对异步请求判断
      if (unmount) {
        
      }
      else {
        setProcessValue(value);
      }
    }
    loadImage(callback);
    return () => {
      setUnmount(true);
    }
  },[ unmount ]);

  useEffect(() => {
    if (processValue === 100) {
      console.log("success");
      anime({
        targets: ".home-guide-container",
        autoplay: true,
        duration: 1000,
        opacity: [0,1],
        easing: "linear"
      });
    }
  }, [ processValue ]);

  return (
    <div className="home-container">
      <LoadingAnime
        isPaused={isPaused}
        isStopped={isStopped}
        processValue={processValue}
      />
      <div className="home-guide-container" onClick={handleClick}>
        <p>点击进入星系</p>
      </div>
      <div className="home-introduction-container">
        <p className="home-introduction-headline">ABOUT NCUHOME</p>
        {indexText.map((line,index) => (<p key={index}>{line}</p>))}
      </div>
      <div className="home-hidden-container">
        <p>欢迎来到NCUHOME的世界</p>
        <p>不平凡将从这里开始</p>
      </div>
    </div>
  )
}

export default withRouter(Home);