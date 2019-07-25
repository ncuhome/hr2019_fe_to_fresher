import * as React from 'react';
import anime from 'animejs';
import './style.css';

const ncuhomePlanet = require('../../assets/png/ncuhome_planet.png')
const pmPlanet = require('../../assets/png/introduce_pm_planet.png');
const devPlanet = require('../../assets/png/introduce_dev_planet.png');
const desighPlanet = require('../../assets/png/introduce_desigh_planet.png');
const unknownPlanet = require('../../assets/png/introduce_unknown_planet.png');

const { useState, useEffect } = React;

const planetArray = [pmPlanet,devPlanet,desighPlanet,unknownPlanet];

export default function GroupIntro() {

  const [ index, setIndex ] = useState(0);
  const [ isAnimeing, setIsAnimeing ] = useState(false);

  const handlePreClick = (e:React.MouseEvent<HTMLElement,MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(false);
    }
  }

  const handleNextClick = (e:React.MouseEvent<HTMLElement,MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(true);
    }
  }

  const startAnime = (isNext:boolean) =>{
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
    },"0");
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
    },"0");
    preTimeline.pause();
    
    const modalApearAnime = anime({
      targets: ".modal-container",
      opacity: [0,0.85],
      duration: 1000,
      easing: 'linear',
    })
    const modalDisapearAnime = anime({
      targets: ".modal-container",
      opacity: [0.85,0],
      duration: 1000,
      easing: 'linear',
    });

    // 选择
    modalDisapearAnime.finished.then(() => {
      if (isNext) {
        nextTimeline.finished.then(() => {
          preTimeline.finished.then(() => {
            modalApearAnime.play()
            setIsAnimeing(false);
          });
          setIndex(index+1);
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
          setIndex(index-1);

          nextTimeline.reverse();
          nextTimeline.seek(nextTimeline.duration);
          nextTimeline.play();
        });
        preTimeline.play();
      }
    });
  }

  useEffect(() => {
    const joinusArrow = anime({
      targets: ".joinus-container span",
      loop: true,
      autoplay: true,
      translateX: "-10px",
      direction: "alternate",
      easing: 'easeInOutQuad'
    });
  },[]);

  return(
    <div className="container">
      <div className="next-planet-container">
        <img src={planetArray[(index+1)%3]} alt="下一个星球"/>
      </div>
      <div className="ncuhome-planet-container">
        <img src={ncuhomePlanet} alt="家园星球"/>
      </div>
      <div className="now-planet-container">
        <img src={planetArray[(index)%3]} alt="现在的星球"/>
      </div>
      <div className="modal-container">
        <div className="introduction-text-container">
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
          JOIN US
        </div>
        <div className="arrow-pre" onClick={handlePreClick}/>
        <div className="arrow-next" onClick={handleNextClick} />
      </div>
    </div>
  )
}