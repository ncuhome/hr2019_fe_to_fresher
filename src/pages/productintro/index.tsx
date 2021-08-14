import * as React from 'react';
import anime, { AnimeInstance } from 'animejs';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as ReactGA from 'react-ga';
import config from '../../config';
import './style.css';

const { products } = config;
const { useState, useEffect } = React;

const productPlanet = require('../../assets/png/product_planet.png');
const iNCU = require('../../assets/png/products/iNCU.png');
const NCUOS = require('../../assets/png/products/NCUOS.png');
const mainSite = require('../../assets/png/products/mainSite.png');
const other = require('../../assets/png/products/other.png');
const US = require('../../assets/png/products/US.png');
const QRcode = require('../../assets/png/qr.png');

const arrowDown = require('../../assets/svg/product_arrow_down.svg');
const pointerImg = require('../../assets/svg/pointer.svg');
const closeCircle = require('../../assets/svg/close_circle.svg');

const itemArray = ['iNCU', 'NCUOS', 'mainSite', 'other', 'US'];
const rotateArray = [
  [0, 1, 2, -2, -1], [-1, 0, 1, 2, -2], [-2, -1, 0, 1, 2], [2, -2, -1, 0, 1], [1, 2, -2, -1, 0]
];

let itemContainerRef: HTMLDivElement;
let arrowRef: HTMLImageElement;

const ProductIntro: React.FC<RouteComponentProps> = props => {

  const [index, setIndex] = useState(0);
  const [rotatedValue, setRotatedValue] = useState(360);
  const [isAnimeing, setIsAnimeing] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleQRcodeClcik = () => {
    ReactGA.event({
      category: 'ProductIntro',
      action: 'Join our welcome group by Click'
    });
    window.location.href = 'https://qm.qq.com/cgi-bin/qm/qr?k=6AH9HIi3BxjQAw6BJruv7utQ3HZe52R2&jump_from=webapi';
  };

  useEffect(() => {
    // 设置产品图片位置、角度
    itemContainerRef.childNodes.forEach((child: HTMLElement, key) => {
      const deg = 72 * key;
      const changeHeight = (window.innerHeight * 20) / (window.innerWidth);
      child.style['top'] = `${changeHeight - 37.5 * Math.sin((90 - deg) * Math.PI / 180)}vw`;
      child.style['left'] = `${32.5 + 37.5 * Math.cos((90 - deg) * Math.PI / 180)}vw`;
      child.style['transform'] = `rotate(${deg}deg)`;
    });
    const startAnimeTimeline = anime.timeline({
      autoplay: true
    });
    startAnimeTimeline.add({
      targets: '.productintro-container .product-planet-container',
      rotate: [220, 360],
      duration: 3400,
      easing: 'easeOutElastic'
    }, 0);
    const arrowAnime = anime({
      targets: '.productintro-container .introduce-to-group-container img',
      translateY: '-8px',
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    const pointerAnime = anime({
      targets: '.product-pointer-container',
      duration: 1000,
      loop: true,
      direction: 'alternate',
      rotate: ['140deg', '150deg'],
      translateY: '-10px',
      translateX: '15px',
      easing: 'easeInOutQuad'
    });
    anime({
      targets: '.product-pointer-container',
      autoplay: true,
      opacity: [0, 1],
      delay: 1500,
      duration: 500,
      easing: 'linear'
    });
    return () => {
      // 清理动画防止内存泄漏
      anime.running.forEach((instance: AnimeInstance) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instance.animatables.forEach((animatable: any) => {
          // console.log(animatable);
          anime.remove(animatable.target);
        });
      });
    };
  }, []);

  useEffect(() => {
    // 处理点击产品星球转动动画
    const handleItemClick = (event: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imgDom: any = event.target;
      const itemIndex = itemArray.indexOf(imgDom.alt);
      const rotateStep = rotateArray[index][itemIndex];
      ReactGA.event({
        category: 'Product',
        action: 'View one of our products'
      });
      if (isFirst) {
        anime.remove('.product-pointer-container');
        anime({
          targets: '.product-pointer-container',
          autoplay: true,
          opacity: 0,
          duration: 500,
          easing: 'linear',
          complete: () => {
            setIsFirst(false);
          }
        });
      }
      if (itemIndex === index && isAnimeing) {
        event.preventDefault();
      }
      else {
        anime.remove(`.productintro-container .product-item-container #product${index}`);
        anime.set(`.productintro-container .product-item-container #product${index}`, {
          translateY: 0
        });
        setIndex(itemIndex);
        const productPlanetAnime = anime({
          targets: '.productintro-container .product-planet-container',
          rotate: `${rotatedValue - rotateStep * 72}`,
          duration: 2000,
          easing: 'easeOutElastic',
          autoplay: true
        });
        setRotatedValue(rotatedValue - rotateStep * 72);
      }
    };
    itemContainerRef.childNodes.forEach((child: HTMLElement, key) => {
      child.addEventListener('click', handleItemClick);
    });
    return () => {
      itemContainerRef.childNodes.forEach((child: HTMLElement, key) => {
        child.removeEventListener('click', handleItemClick);
      });
    };
  }, [index, rotatedValue, isAnimeing, isFirst]);

  useEffect(() => {
    // 离场动画
    const changeAnimeTimeline = anime.timeline({
      autoplay: false
    });
    changeAnimeTimeline.add({
      targets: '.introduce-to-group-container',
      opacity: 0,
      duration: 500,
      easing: 'linear'
    }, 0)
      .add({
        targets: '.productintro-container .joinlink',
        opacity: 0,
        duration: 500,
        easing: 'linear'
      }, 0)
      .add({
        targets: '.product-introduce-container',
        opacity: 0,
        duration: 500,
        easing: 'linear'
      }, 0)
      .add({
        targets: '.productintro-container .product-planet-container',
        delay: 700,
        scale: 3,
        // 防止设置scale将rotate的值重置
        rotate: [rotatedValue, rotatedValue],
        bottom: '-600px',
        left: '-800px',
        easing: 'easeInQuart',
        duration: 1400
      }, 0)
      .add({
        targets: '.productintro-container',
        delay: 1000,
        scale: 3,
        translateX: '-22vw',
        translateY: '25vh',
        easing: 'easeInQuart',
        opacity: [1, 0],
        duration: 1400,
        endDelay: 100,
        complete: () => {
          if (!changeAnimeTimeline.reversed) {
            props.history.push('/department');
          }
          else {
            setIsAnimeing(false);
          }
        }
      }, 0);
    arrowRef.onclick = () => {
      setIsAnimeing(true);
      anime.remove('.product-pointer-container');
      anime.set('.product-pointer-container', { opacity: 0 });
      changeAnimeTimeline.play();
    };
    // 滑动动画
    interface Pos {
      x: number;
      y: number;
      time?: number;
    }
    let startPos: Pos; let endPos: Pos; let isScrolling: number; let
      animeTime: number;
    // 处理滑动
    const handleTouch = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      if (event.cancelable) event.preventDefault();
      const touch = event.targetTouches[0];
      endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
      isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
      if (isScrolling === 1) {
        animeTime = -(endPos.y / 10) * 50;
        changeAnimeTimeline.seek(animeTime);
      }
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const duration = Number(new Date()) - startPos.time;
      if (isScrolling === 1) {    // 当为竖直滚动时
        if (Number(duration) > 10 && endPos.y < -200) {
          changeAnimeTimeline.play();
        }
        else {
          changeAnimeTimeline.pause();
          if (changeAnimeTimeline.reversed) {
            changeAnimeTimeline.play();
          }
          else {
            changeAnimeTimeline.seek(animeTime);
            changeAnimeTimeline.reverse();
            changeAnimeTimeline.play();
            setIsAnimeing(true);
          }
        }
      }
      document.body.removeEventListener('touchmove', handleTouch);
      document.body.removeEventListener('touchend', handleTouchEnd);
      return true;
    };
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.targetTouches[0];
      startPos = { x: touch.pageX, y: touch.pageY, time: Number(new Date()) };
      isScrolling = 0;
      if (!isAnimeing && !isShowModal) {
        document.body.addEventListener('touchmove', handleTouch, { passive: false });
        document.body.addEventListener('touchend', handleTouchEnd);
      }
    };
    document.body.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.body.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isAnimeing, rotatedValue, isShowModal]);

  useEffect(() => {
    const selectedPlanetAnime = anime({
      targets: `.productintro-container .product-item-container #product${index}`,
      translateY: '-10px',
      // scale: "1.12",
      duration: 1000,
      direction: 'alternate',
      endDelay: 500,
      autoplay: true,
      loop: true
    });
  }, [index]);

  return (
    <div className="productintro-container">
      <div className="joinlink-container">
        <span className="joinlink" onClick={() => { setIsShowModal(true) }}>
          招新群
        </span>
        <span className="joinlink">
          <Link to="/application">报名直达</Link>
        </span>
      </div>
      <div className="product-introduce-container">
        <p className="product-name">{products[index].name}</p>
        <div className="product-description-container">
          {products[index].description.map((line: string, index: number) => (<p key={index}>{line}</p>))}
        </div>
      </div>
      <div className="product-planet-container">
        <div className="product-pointer-container">
          <img src={pointerImg} />
        </div>
        <img src={productPlanet} className="product-planet" />
        <div className="product-item-container" ref={Ref => { itemContainerRef = Ref }} >
          <img src={iNCU} alt="iNCU" id="product0" />
          <img src={NCUOS} alt="NCUOS" id="product1" />
          <img src={mainSite} alt="mainSite" id="product2" />
          <img src={other} alt="other" id="product3" />
          <img src={US} alt="US" id="product4" />
        </div>
      </div>
      <div className="introduce-to-group-container">
        <p>认识创造者们</p>
        <img src={arrowDown} alt="向下" ref={(myRef) => { arrowRef = myRef }} />
      </div>
      <div className="QRcode-modal-container" hidden={!isShowModal} >
        <div className="QRcode-modal-background">
          <div className="QRcode-text-container">
            <i id="modal-close-btn" onClick={() => { setIsShowModal(false) }}><img src={closeCircle} /></i>
            <p>2021家园工作室招新QQ群</p>
            <img src={QRcode} alt="二维码" id="qrcode-img" onClick={handleQRcodeClcik} />
            <p>群号650152492</p>
            <p>扫描或点击</p>
            <p>资料&解答&关于我们</p>
            <p>欢迎来玩</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductIntro);
