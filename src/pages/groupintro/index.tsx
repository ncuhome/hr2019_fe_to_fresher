import * as React from 'react';
import anime from 'animejs';
import './style.css';
import { Link } from 'react-router-dom';

const ncuhomePlanet = require('../../assets/png/ncuhome_planet.png')
const pmPlanet = require('../../assets/png/introduce_pm_planet.png');
const devPlanet = require('../../assets/png/introduce_dev_planet.png');
const desighPlanet = require('../../assets/png/introduce_desigh_planet.png');
const unknownPlanet = require('../../assets/png/introduce_unknown_planet.png');

const { useState, useEffect } = React;

const planetArray = [pmPlanet, devPlanet, desighPlanet, unknownPlanet];
let textRef: HTMLDivElement;

export default function GroupIntro(props:any) {

  const [index, setIndex] = useState(0);
  const [isAnimeing, setIsAnimeing] = useState(false);

  const handlePreClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(false);
    }
  }

  const handleNextClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(true);
    }
  }

  const startAnime = (isNext: boolean) => {
    setIsAnimeing(true);
    const nextTimeline = anime.timeline({
      duration: 1000,
      easing: 'easeInOutQuad',
      direction: 'normal'
    });
    nextTimeline.add({
      targets: ".next-planet-container",
      translateX: "100vw",
      translateY: "15vh"
    })
      .add({
        targets: ".now-planet-container",
        translateX: "-100vw",
        translateY: "-15vh"
      }, "0");
    nextTimeline.pause();

    const preTimeline = anime.timeline({
      duration: 1000,
      easing: 'easeInOutQuad',
      direction: 'normal'
    });
    preTimeline.add({
      targets: ".next-planet-container",
      translateX: "-100vw",
      translateY: "-15vh"
    })
      .add({
        targets: ".now-planet-container",
        translateX: "100vw",
        translateY: "15vh"
      }, "0");
    preTimeline.pause();

    // 介绍文字显示消失用reserve不知为何会闪一下，只好写两个
    const modalApearAnime = anime({
      targets: ".modal-container",
      opacity: [0, 0.85],
      duration: 1000,
      easing: 'linear',
    })
    const modalDisapearAnime = anime({
      targets: ".modal-container",
      opacity: [0.85, 0],
      duration: 1000,
      easing: 'linear',
    });

    // 介绍文字消失后promise
    modalDisapearAnime.finished.then(() => {
      if (isNext) {
        nextTimeline.finished.then(() => {
          preTimeline.finished.then(() => {
            modalApearAnime.play()
            setIsAnimeing(false);
          });
          setIndex(index + 1);
          preTimeline.reverse();
          preTimeline.seek(preTimeline.duration);
          preTimeline.play();
        });
        nextTimeline.play();
      } else {
        preTimeline.finished.then(() => {
          nextTimeline.finished.then(() => {
            modalApearAnime.play();
            setIsAnimeing(false);
          });
          setIndex(index - 1);

          nextTimeline.reverse();
          nextTimeline.seek(nextTimeline.duration);
          nextTimeline.play();
        });
        preTimeline.play();
      }
    });
  }

  useEffect(() => {
    // Join Us 箭头动画
    const joinusArrow = anime({
      targets: ".joinus-container span",
      loop: true,
      autoplay: true,
      translateX: "-10px",
      direction: "alternate",
      easing: 'easeInOutQuad'
    });
  },[]);

  useEffect(() => {
    let startPos: any, endPos: any, isScrolling: number;
    // 处理滑动
    const handleTouch = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      const touch = event.targetTouches[0];
      endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
      isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
      if (isScrolling === 0) {
        event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
      }
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const duration = +new Date - startPos.time;
      if (isScrolling === 0) {    //当为水平滚动时
        if (Number(duration) > 10) {
          //判断是左移还是右移，当偏移量大于10时执行
          if (endPos.x > 10 && index!==0) {
            startAnime(false);
          } else if (endPos.x < -10 && index !==3) {
            startAnime(true);
          }
        }
      }
      textRef.removeEventListener("touchmove", handleTouch);
      textRef.removeEventListener("touchend", handleTouchEnd);
      return true;
    }
    const handleTouchStart = (event: TouchEvent) => {
      if(!isAnimeing) {
        const touch = event.targetTouches[0];
        startPos = { x: touch.pageX, y: touch.pageY, time: +new Date };
        isScrolling = 0;
        textRef.addEventListener("touchmove", handleTouch);
        textRef.addEventListener("touchend", handleTouchEnd);
      }
    }
    textRef.addEventListener("touchstart", handleTouchStart);
    return () => {
      textRef.removeEventListener("touchstart", handleTouchStart)
    }
  }, [isAnimeing]);

  return (
    <div className="groupintro-container">
      <div className="next-planet-container">
        <img src={planetArray[(index + 1) % 3]} alt="下一个星球" />
      </div>
      <div className="ncuhome-planet-container">
        <img src={ncuhomePlanet} alt="家园星球" />
      </div>
      <div className="now-planet-container">
        <img src={planetArray[index]} alt="现在的星球" />
      </div>
      <div className="modal-container">
        <div className="introduction-text-container" ref={Ref => textRef = Ref}>
          <div className="headline-container">
            <p>产品 组</p>
          </div>
          <div className="subheading-container">
            <p>人均都有超能力</p>
          </div>
          <div className="introdution-container">
            <p>头脑风暴、思维导图、交互设计</p>
            <p>我们是逻辑控、控制狂</p>
            <p>规划产品蓝图</p>
            <p>把控项目进度</p>
            <p>协调对接工作</p>
            <p>一款产品的前世今生，由我们缔造</p>
          </div>
        </div>
        <div className="joinus-container">
          <span />
          <Link to="/application" >
            JOIN US
          </Link>
        </div>
        <div className="arrow-pre" onClick={handlePreClick} hidden={index===0} />
        <div className="arrow-next" onClick={handleNextClick} hidden={index===3} />
      </div>
    </div>
  )
}