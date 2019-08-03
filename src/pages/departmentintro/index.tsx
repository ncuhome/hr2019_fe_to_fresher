import * as React from "react";
import anime from "animejs";
import { Link } from "react-router-dom";
import BackArrow from "../../components/BackArrow";
import config from "../../config";
import "./style.css";

const { useState, useEffect } = React;
const { departments } = config;

const joinusArrow = require("../../assets/svg/introduce_joinus.svg");
const changeArrow = require("../../assets/svg/introduce_arrow.svg");

const ncuhomePlanet = require("../../assets/png/ncuhome_planet.png")
const managePlanet = require("../../assets/png/introduce_manage_planet.png");
const omPlanet = require("../../assets/png/introduce_om_planet.png");
const pmPlanet = require("../../assets/png/introduce_pm_planet.png");
const desighPlanet = require("../../assets/png/introduce_desigh_planet.png");
const devPlanet = require("../../assets/png/introduce_dev_planet.png");

const orbits = require("../../assets/png/introduce_orbits.png");

const planetArray = [managePlanet, omPlanet, pmPlanet, desighPlanet, devPlanet];

let textRef: HTMLDivElement;

export default function DepartmentsIntro(props: any) {

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

  const handleBackClick = (e:MouseEvent) => {
    props.history.push("/product");
  }

  const safeSetIndex = (v:number) => {
    const remainder = v % 5;
    if (remainder < 0) {
      setIndex(remainder+5);
    }
    else {
      setIndex(remainder);
    }
  }

  const startAnime = (isNext: boolean) => {
    setIsAnimeing(true);
    const nextTimeline = anime.timeline({
      autoplay: false,
      duration: 1000,
      easing: "easeInOutQuad",
      direction: "normal",
    });
    nextTimeline.add({
      targets: ".next-planet-container",
      translateX: "100vw",
      translateY: "15vh",
    })
    .add({
      targets: ".now-planet-container",
      translateX: "-100vw",
      translateY: "-20vh",
    }, "0");

    const preTimeline = anime.timeline({
      autoplay: false,
      duration: 1000,
      easing: "easeInOutQuad",
      direction: "normal",
    });
    preTimeline.add({
      targets: ".next-planet-container",
      translateX: "-100vw",
      translateY: "-15vh",
    })
    .add({
      targets: ".now-planet-container",
      translateX: "100vw",
      translateY: "20vh",
    }, "0");

    // 介绍文字显示消失用reserve不知为何会闪一下，只好写两个
    const modalApearAnime = anime({
      targets: ".modal-container",
      opacity: [0, 0.85],
      duration: 1000,
      easing: "linear",
    })
    const modalDisapearAnime = anime({
      targets: ".modal-container",
      opacity: [0.85, 0],
      duration: 1000,
      easing: "linear",
    });

    // 介绍文字消失后promise
    modalDisapearAnime.finished.then(() => {
      if (isNext) {
        nextTimeline.finished.then(() => {
          preTimeline.finished.then(() => {
            modalApearAnime.play()
            setIsAnimeing(false);
          });
          safeSetIndex(index + 1);
          
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
          safeSetIndex(index - 1);

          nextTimeline.reverse();
          nextTimeline.seek(nextTimeline.duration);
          nextTimeline.play();
        });
        preTimeline.play();
      }
    });
  }

  useEffect(() => {
    const handleTouch = (e:TouchEvent) => { e.preventDefault(); };
    document.body.addEventListener("touchmove", handleTouch, { passive:false });
    // 开场动画
    setIsAnimeing(true);
    const startTimeline = anime.timeline();
    startTimeline.add({
      targets: ".groupintro-orbits-mask",
      opacity: [0,1],
      duration: 1000,
      easing: "linear",
    })
    .add({
      targets: ".groupintro-container .next-planet-container,.ncuhome-planet-container,.now-planet-container",
      opacity: [0,1],
      duration: 1000,
      easing: "linear",
    },"+=0")
    .add({
      targets: ".groupintro-container .modal-container",
      opacity: [0,0.85],
      duration: 1000,
      easing: "linear",
    },"+=0");
    startTimeline.finished.then(() => {
      setIsAnimeing(false);
    })
    // Join Us 箭头动画
    const joinusArrowAnime = anime({
      targets: ".joinus-container span",
      loop: true,
      autoplay: true,
      translateX: "-10px",
      direction: "alternate",
      easing: "easeInOutQuad",
    });
    return () => {
      document.body.removeEventListener("touchmove", handleTouch)
      anime.remove(".joinus-container span");
      anime.remove(".groupintro-orbits-mask");
      anime.remove(".groupintro-container .next-planet-container,.ncuhome-planet-container,.now-planet-container");
      anime.remove(".groupintro-container .modal-container");
      anime.remove(".joinus-container span");
    }
  }, []);

  useEffect(() => {
    let startPos: any, endPos: any, isScrolling: number;
    // 处理滑动
    const handleTouch = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      const touch = event.targetTouches[0];
      endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
      isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
      if (isScrolling === 0 && event.cancelable) {
        event.preventDefault();
      }
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const duration = +new Date - startPos.time;
      if (isScrolling === 0) {    //当为水平滚动时
        if (Number(duration) > 10) {
          //判断是左移还是右移，当偏移量大于10时执行
          if (endPos.x > 10) {
            startAnime(false);
          } else if (endPos.x < -10) {
            startAnime(true);
          }
        }
      }
      textRef.removeEventListener("touchmove", handleTouch);
      textRef.removeEventListener("touchend", handleTouchEnd);
      return true;
    }
    const handleTouchStart = (event: TouchEvent) => {
      if (!isAnimeing) {
        const touch = event.targetTouches[0];
        startPos = { x: touch.pageX, y: touch.pageY, time: +new Date };
        isScrolling = 0;
        textRef.addEventListener("touchmove", handleTouch, { passive:false });
        textRef.addEventListener("touchend", handleTouchEnd);
      }
    }
    textRef.addEventListener("touchstart", handleTouchStart);
    return () => {
      textRef.removeEventListener("touchstart", handleTouchStart)
    }
  }, [ isAnimeing ]);

  return (
    <div className="groupintro-container">
      <div className="groupintro-orbits-mask">
        <img src={orbits}/>
      </div>
      <div className="next-planet-container">
        <img src={planetArray[(index + 1) % 5]} alt="下一个星球" />
      </div>
      <div className="ncuhome-planet-container">
        <img src={ncuhomePlanet} alt="家园星球" />
      </div>
      <div className="now-planet-container">
        <img src={planetArray[index]} alt="现在的星球" />
      </div>
      <div className="modal-container">
        <div className="modal-container-background">
          <div className="introduction-text-container" ref={Ref => textRef = Ref}>
            <div className="headline-container">
              <p>{departments[index].name} 组</p>
            </div>
            <div className="subheading-container">
              <p>{departments[index].subheading}</p>
            </div>
            <div className="introdution-container">
              {departments[index].description.map((line: string, lineIndex: number) => (<p key={lineIndex}>{line}</p>))}
            </div>
            <div className="traits-contianer">
              特质：
              {departments[index].traits.map((trait: string, traitIndex: number) => {
                return (traitIndex+1) === departments[index].traits.length ? 
                (<span key={traitIndex}>{trait}</span>) :
                (<React.Fragment key={traitIndex}><span>{trait}</span>、</React.Fragment>);
              })}
            </div>
          </div>
          <div className="joinus-container">
            <span>
              <img src={joinusArrow}/>
            </span>
            <Link to={{
              pathname: "/application",
              state: departments[index].name
            }}>
              JOIN US
          </Link>
          </div>
        </div>
        <img src={changeArrow} className="arrow-pre" onClick={handlePreClick}/>
        <img src={changeArrow} className="arrow-next" onClick={handleNextClick}/>
      </div>
      <BackArrow onClick={handleBackClick} />
    </div>
  )
}