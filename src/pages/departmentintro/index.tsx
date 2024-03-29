import * as React from 'react';
import anime from 'animejs';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as ReactGA from 'react-ga';
import BackArrow from '../../components/BackArrow';
import config from '../../config';
import './style.css';

const { useState, useEffect } = React;
const { departments } = config;

import joinusArrow from '../../assets/svg/introduce_joinus.svg'
import changeArrow from '../../assets/svg/introduce_arrow.svg'

import ncuhomePlanet from '../../assets/png/ncuhome_planet.png'
import managePlanet from '../../assets/png/introduce_manage_planet.png'
import omPlanet from '../../assets/png/introduce_om_planet.png'
import pmPlanet from '../../assets/png/introduce_pm_planet.png'
import desighPlanet from '../../assets/png/introduce_desigh_planet.png'
import devPlanet from '../../assets/png/introduce_dev_planet.png'
import gamePlanet from '../../assets/png/introduce_game_planet.png'
import orbits from '../../assets/png/introduce_orbits.png'

const planetArray = [pmPlanet, managePlanet, omPlanet, desighPlanet, devPlanet, gamePlanet];

let textRef: HTMLDivElement;

const DepartmentsIntro: React.FC<RouteComponentProps> = (props) => {

  const [index, setIndex] = useState(0);
  const [isAnimeing, setIsAnimeing] = useState(false);

  const handlePreClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(false);
    }
  };

  const handleNextClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isAnimeing) {
      startAnime(true);
    }
  };

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.history.push('/product');
  };

  const safeSetIndex = (v: number) => {
    const remainder = v % 6;
    if (remainder < 0) {
      setIndex(remainder + 6);
    }
    else {
      setIndex(remainder);
    }
  };

  const startAnime = (isNext: boolean) => {
    setIsAnimeing(true);
    ReactGA.event({
      category: 'Department',
      action: 'View one of our departments'
    });
    const nextTimeline = anime.timeline({
      autoplay: false,
      duration: 600,
      easing: 'easeInOutQuad',
      direction: 'normal'
    });
    nextTimeline.add({
      targets: '.next-planet-container',
      translateX: '100vw',
      translateY: '15vh'
    })
      .add({
        targets: '.now-planet-container',
        translateX: '-100vw',
        translateY: '-20vh'
      }, '0');

    const preTimeline = anime.timeline({
      autoplay: false,
      duration: 800,
      easing: 'easeInOutQuad',
      direction: 'normal'
    });
    preTimeline.add({
      targets: '.next-planet-container',
      translateX: '-100vw',
      translateY: '-15vh'
    })
      .add({
        targets: '.now-planet-container',
        translateX: '100vw',
        translateY: '20vh'
      }, '0');

    // 介绍文字显示消失用reserve不知为何会闪一下，只好写两个
    const modalApearAnime = anime({
      targets: '.modal-container',
      opacity: [0, 1],
      duration: 600,
      easing: 'linear'
    });
    const modalDisapearAnime = anime({
      targets: '.modal-container',
      opacity: [1, 0],
      duration: 600,
      easing: 'linear'
    });

    // 介绍文字消失后promise
    modalDisapearAnime.finished.then(() => {
      if (isNext) {
        nextTimeline.finished.then(() => {
          preTimeline.finished.then(() => {
            modalApearAnime.play();
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
  };

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => { e.preventDefault() };
    document.body.addEventListener('touchmove', handleTouch, { passive: false });
    // 开场动画
    setIsAnimeing(true);
    const startTimeline = anime.timeline({
      autoplay: true,
      complete: () => {
        setIsAnimeing(false);
      }
    });
    startTimeline.add({
      targets: '.groupintro-orbits-mask',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    })
      .add({
        targets: '.back-arrow-container',
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear'
      })
      .add({
        targets: '.groupintro-container .next-planet-container,.ncuhome-planet-container,.now-planet-container',
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear'
      }, '+=0')
      .add({
        targets: '.groupintro-container .modal-container ',
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear'
      }, '+=0');
    // Join Us 箭头动画
    const joinusArrowAnime = anime({
      targets: '.joinus-container span',
      loop: true,
      autoplay: true,
      translateX: '-10px',
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    return () => {
      document.body.removeEventListener('touchmove', handleTouch);
      startTimeline.pause();
      anime.running.forEach((instance) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instance.animatables.forEach((animatable: any) => {
          anime.remove(animatable.target);
        });
      });
    };
  }, []);

  useEffect(() => {
    interface Pos {
      x: number;
      y: number;
      time?: number;
    }
    let startPos: Pos; let endPos: Pos;
    let isScrolling: number;
    // 处理滑动
    const handleTouch = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      const touch = event.targetTouches[0];
      endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
      isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
      if (isScrolling === 0 && event.cancelable) {
        event.preventDefault();
      }
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const duration = Number(new Date()) - startPos.time;
      if (isScrolling === 0) {    // 当为水平滚动时
        if (Number(duration) > 10) {
          // 判断是左移还是右移，当偏移量大于10时执行
          if (endPos.x > 10) {
            startAnime(false);
          } else if (endPos.x < -10) {
            startAnime(true);
          }
        }
      }
      textRef.removeEventListener('touchmove', handleTouch);
      textRef.removeEventListener('touchend', handleTouchEnd);
      return true;
    };
    const handleTouchStart = (event: TouchEvent) => {
      if (!isAnimeing) {
        const touch = event.targetTouches[0];
        startPos = { x: touch.pageX, y: touch.pageY, time: Number(new Date()) };
        isScrolling = 0;
        textRef.addEventListener('touchmove', handleTouch, { passive: false });
        textRef.addEventListener('touchend', handleTouchEnd);
      }
    };
    textRef.addEventListener('touchstart', handleTouchStart);
    return () => {
      textRef.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isAnimeing]);

  return (
    <div className="groupintro-container">
      <BackArrow onClick={handleBackClick} />
      <div className="groupintro-orbits-mask">
        <img src={orbits} />
      </div>
      <div className="next-planet-container">
        <img src={planetArray[(index + 1) % 6]} alt="下一个星球" />
      </div>
      <div className="ncuhome-planet-container">
        <img src={ncuhomePlanet} alt="家园星球" />
      </div>
      <div className="now-planet-container">
        <img src={planetArray[index]} alt="现在的星球" />
      </div>
      <div className="modal-container">
        <div className="modal-container-background">
          <div className="introduction-text-container" ref={Ref => { textRef = Ref }}>
            <div className="headline-container">
              <p>{departments[index].name}组</p>
            </div>
            <div className="subheading-container">
              <p>{departments[index].subheading}</p>
            </div>
            <div className="introdution-container">
              {departments[index].description.map((line: string, lineIndex: number) => (<p key={lineIndex}>{line}</p>))}
            </div>
            <div className="traits-contianer">
              <span>特质：</span>
              <div className="traits-display-container">
                {departments[index].traits.map((trait: string, traitIndex: number) => {
                  return (traitIndex + 1) === departments[index].traits.length ?
                    (<span key={traitIndex}>{trait}</span>) :
                    (<React.Fragment key={traitIndex}><span>{trait}</span>&nbsp;&nbsp;</React.Fragment>);
                })}
              </div>
            </div>
          </div>
          <div className="joinus-container">
            <span>
              <img src={joinusArrow} />
            </span>
            <Link to={{
              pathname: '/application',
              state: `${departments[index].name}组`
            }}>
              JOIN US
            </Link>
          </div>
        </div>
        <img src={changeArrow} className="arrow-pre" onClick={handlePreClick} />
        <img src={changeArrow} className="arrow-next" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default DepartmentsIntro;
