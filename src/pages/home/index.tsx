import * as React from 'react';
import anime from 'animejs';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ReactGA from 'react-ga';
import LoadingAnime from '../../components/LoadingAnime';
import loadImage from '../../image';
import config from '../../config';
import './style.css';
import axios from 'axios';
import { dataModule } from 'mincu-vanilla';
import { useAppReady } from 'mincu-hooks';
import { toast } from 'react-toastify';

const { useState, useEffect } = React;
const { indexText } = config;
const Home: React.FC<RouteComponentProps> = props => {
  const isReady = useAppReady()
  const [isAnimeing, setIsAnimeing] = useState(false);
  const [processValue, setProcessValue] = useState(0);
  const [unmount, setUnmount] = useState(true);
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsAnimeing(true);
    if (!isAnimeing) {
      const changeAnime = anime.timeline({
        autoplay: true,
        complete: () => {
          props.history.push('/product');
        }
      });
      changeAnime.add({
        targets: '.loading-container,.home-guide-container,.home-introduction-container',
        duration: 1200,
        opacity: [1, 0],
        easing: 'linear'
      })
        .add({
          targets: '.home-hidden-container',
          duration: 500,
          opacity: [0, 1],
          easing: 'linear',
          endDelay: 1000
        })
        .add({
          targets: '.home-hidden-container',
          duration: 1000,
          opacity: [1, 0],
          easing: 'linear'
        });
    }
  };




  useEffect(()=>{
    if(isReady){
      const token = dataModule.appData.user.token
      axios({
        method: 'GET',
        url: 'https://2021hrapi.ncuos.com/api/user/',
        headers: {
          'Authorization': 'passport ' + token
        }
      }).then(res => {
        if (res.data.data.step === 1) {
          toast(' 你已经报过名了噢，已为你跳转到进度查询页面~ （也可返回再次提交报名表以更改报名信息）')
          props.history.push('/checkProgress')
        }
      })
    }
  },[isReady])

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => { e.preventDefault() };
    document.body.addEventListener('touchmove', handleTouch, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', handleTouch);
      anime.running.forEach((instance) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instance.animatables.forEach((animatable: any) => {
          anime.remove(animatable.target);
        });
      });
    };
  }, []);

  useEffect(() => {
    setUnmount(false);
    anime({
      targets: '.home-introduction-container',
      duration: 1000,
      opacity: [0, 1],
      easing: 'linear'
    });
    let startTime: Date;
    const callback = (count: number, length: number) => {
      const value = Math.round((count / length) * 100);
      // 解决组件销毁的时候对异步请求判断
      if (!unmount) {
        setProcessValue(value);
        if (value === 100) {
          ReactGA.timing({
            category: 'Image',
            variable: 'load',
            value: (Number(new Date()) - (Number(startTime)))
          });
        }
      }
    };
    startTime = new Date();
    loadImage(callback);
    return () => {
      setUnmount(true);
    };
  }, [unmount]);

  useEffect(() => {
    const guideAppear = anime({
      targets: '.home-guide-container',
      autoplay: false,
      duration: 1000,
      opacity: [0, 1],
      easing: 'linear'
    });
    if (processValue === 100) {
      guideAppear.play();
    }
  }, [processValue]);

  return (
    <div className="home-container">
      <LoadingAnime
        processValue={processValue}
      />
      <div className="home-guide-container" onClick={handleClick}>
        <div className="arrow" />
        <div>点击进入星系</div>
      </div>
      <div className="home-introduction-container">
        {/* <p className="home-introduction-headline">ABOUT NCUHOME</p> */}
        <div>{indexText.map((line, index) => (<p key={index}>{line}</p>))}</div>
      </div>
      <div className="home-hidden-container">
        <p>欢迎来到NCUHOME的世界</p>
        <p>不平凡将从这里开始</p>
      </div>
    </div>
  );
};

export default withRouter(Home);
