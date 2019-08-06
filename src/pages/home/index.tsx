import * as React from "react";
import anime from 'animejs';
import { withRouter } from "react-router";
import * as ReactGA from 'react-ga';
import LoadingAnime from "../../components/LoadingAnime";
import loadImage from "../../image";
import config from "../../config";
import "./style.css";

const { useState, useEffect } = React;
const { indexText } = config;

const Home = (props:any) => {

  const [ isAnimeing, setIsAnimeing ] = useState(false);
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
        duration: 1200,
        opacity: [1,0],
        easing: "linear"
      })
      .add({
        targets: ".home-hidden-container",
        duration: 500,
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
      document.body.removeEventListener("touchmove", handleTouch);
      anime.running.forEach((instance) => {
        instance.animatables.forEach((animatable:any)=>{
          anime.remove(animatable.target);
        });
      });
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
    let startTime:Date;
    const callback = (count:number,length:number) => {
      const value = Math.round((count/length)*100);
      // 解决组件销毁的时候对异步请求判断
      if (unmount) {
        
      }
      else {
        setProcessValue(value);
        if (value === 100) {
          ReactGA.timing({
            category: "Image",
            variable: 'load',
            value: (+(new Date()) - (+startTime)),
          });
        }
      }
    }
    startTime = new Date();
    loadImage(callback);
    return () => {
      setUnmount(true);
    }
  },[ unmount ]);

  useEffect(() => {
    const guideAppear = anime({
      targets: ".home-guide-container",
      autoplay: false,
      duration: 1000,
      opacity: [0,1],
      easing: "linear",
    });
    if (processValue === 100) {
      guideAppear.play();
    }
  }, [ processValue ]);

  return (
    <div className="home-container">
      <LoadingAnime
        processValue={processValue}
      />
      <div className="home-guide-container" onClick={handleClick}>
        <div className="arrow"/>
        <div>点击进入星系</div>
      </div>
      <div className="home-introduction-container">
        <p className="home-introduction-headline">ABOUT NCUHOME</p>
        <div>{indexText.map((line,index) => (<p key={index}>{line}</p>))}</div>
      </div>
      <div className="home-hidden-container">
        <p>欢迎来到NCUHOME的世界</p>
        <p>不平凡将从这里开始</p>
      </div>
    </div>
  )
}

export default withRouter(Home);
