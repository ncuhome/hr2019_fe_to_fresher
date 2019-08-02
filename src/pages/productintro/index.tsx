import * as React from 'react';
import anime from 'animejs';
import { Link, withRouter } from 'react-router-dom';
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

const arrowDown = require('../../assets/svg/product_arrow_down.svg');

const itemArray = ["iNCU", "NCUOS", "mainSite", "other", "US"];
const rotateArray = [
  [0,1,2,-2,-1],[-1,0,1,2,-2],[-2,-1,0,1,2],[2,-2,-1,0,1],[1,2,-2,-1,0]
]

let itemContainerRef:HTMLDivElement;

function ProductIntro(props:any) {
  
  const [ index, setIndex ] = useState(0);
  const [ isAnimeing, setIsAnimeing ] = useState(false);
  const [ rotatedValue, setRotatedValue ] = useState(360);

  const t1 = anime.timeline({
    autoplay: false
  });
  t1.add({
    targets: ".introduce-to-group-container",
    opacity: 0,
    duration: 1000,
    easing: "linear",
  },0)
  .add({
    targets: ".productintro-container .joinlink",
    opacity: 0,
    duration: 1000,
    easing: "linear",
  },0)
  .add({
    targets: ".product-introduce-container",
    opacity: 0,
    duration: 1000,
    easing: "linear"
  },0)
  .add({
    targets: ".productintro-container .product-planet-container",
    scale: 3,
    bottom: "-600px",
    left: "-800px",
    easing: "easeInQuart",
    duration: 3000,
  },"1000")
  .add({
    targets: ".productintro-container",
    scale: 3,
    translateX: "-22vw",
    translateY: "25vh",
    easing: "easeInQuart",
    duration: 3000,
    endDelay:1000,
    complete: () => {
      if (!t1.reversed) {
        props.history.push("/group");
      }
    }
  },"1000");

  const handleArrowClick = () => {
    t1.play();
  }
  
  useEffect(() => {
    itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
      const deg = 72*key;
      const changeHeight = (window.innerHeight * 20)/(window.innerWidth);
      child.style["top"] = `${changeHeight-37.5*Math.sin((90-deg)*Math.PI/180)}vw`;
      child.style["left"] = `${32.5+37.5*Math.cos((90-deg)*Math.PI/180)}vw`;
      child.style["transform"] = `rotate(${deg}deg)`;
    });
    setIsAnimeing(true);
    const startAnime = anime({
      targets: ".productintro-container .product-planet-container",
      rotate: 360,
      duration: 3000,
      easing: "easeOutElastic",
    });
    startAnime.finished.then(()=>{
      setIsAnimeing(false);
    });
    const arrowAnime = anime({
      targets: ".productintro-container .introduce-to-group-container img",
      translateY: "8px",
      loop: true,
      direction: "alternate",
      easing: "easeInOutQuad"
    });
  },[]);

  useEffect(() => {

    const handleItemClick = (event:MouseEvent) => {
      const imgDom:any = event.target;
      const itemIndex = itemArray.indexOf(imgDom.alt);
      const rotateStep = rotateArray[index][itemIndex];
      console.log(rotatedValue);
      if ( itemIndex === index ) {
        event.preventDefault();
      }
      else {
        anime.remove(`.productintro-container .product-item-container #product${index}`);
        anime.set(`.productintro-container .product-item-container #product${index}`, {
          translateY: 0,
        });
        setIndex(itemIndex);
        const productPlanetAnime = anime({
          targets: ".productintro-container .product-planet-container",
          rotate: `${rotatedValue-rotateStep*72}`,
          duration: 2000,
          easing: "easeOutElastic",
          autoplay: true,
        });
        productPlanetAnime.finished.then(()=>{
          setIsAnimeing(false);
        });
        setIsAnimeing(true);
        setRotatedValue(rotatedValue-rotateStep*72);
      }
    };
    itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
      child.addEventListener("click",handleItemClick);
    });
    let startPos: any, endPos: any, isScrolling: number;
    // 处理滑动
    const handleTouch = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      const touch = event.targetTouches[0];
      endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
      isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
      if (isScrolling === 1) {
        if (t1.reversed) {
          t1.reverse();
        }
        t1.pause()
        t1.seek(-(endPos.y/10)*50);
      }
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const duration = +new Date - startPos.time;
      if (isScrolling === 1) {    //当为竖直滚动时
        if (Number(duration) > 10 && endPos.y < -200) {
          t1.play();
          if (t1.reversed) {
            t1.reverse();
          }
        }
        else {
          t1.play();
          if (!t1.reversed) {
            t1.reverse();
          }
        }
      }
      document.body.removeEventListener("touchmove", handleTouch);
      document.body.removeEventListener("touchend", handleTouchEnd);
      return true;
    }
    const handleTouchStart = (event: TouchEvent) => {
      if (!isAnimeing) {
        const touch = event.targetTouches[0];
        startPos = { x: touch.pageX, y: touch.pageY, time: +new Date };
        isScrolling = 0;
        document.body.addEventListener("touchmove", handleTouch, { passive:true });
        document.body.addEventListener("touchend", handleTouchEnd);
      }
    }
    document.body.addEventListener("touchstart", handleTouchStart);
    return () => {
      itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
        child.removeEventListener("click",handleItemClick);
      });
      document.body.removeEventListener("touchstart", handleTouchStart)
    };
  },[ isAnimeing, rotatedValue ]);

  useEffect(() => {
    const selectedPlanetAnime = anime({
      targets: `.productintro-container .product-item-container #product${index}`,
      translateY: "-10px",
      // scale: "1.12",
      duration: 1000,
      direction: "alternate",
      endDelay: 500,
      autoplay: true,
      loop: true,
    });
  }, [ index ]);

  return (
    <div className="productintro-container">
      <div className="joinlink-container">
        <span className="joinlink">
          <Link to="/application">报名直达</Link>
        </span>
      </div>
      <div className="product-introduce-container">
        <p className="product-name">{products[index].name}</p>
        <div className="product-description-container">
          {products[index].description.map((line:string,index:number)=>(<p key={index}>{line}</p>))}
        </div>
      </div>
      <div className="product-planet-container">
        <img src={productPlanet} className="product-planet"/>
        <div className="product-item-container" ref={Ref=>{itemContainerRef=Ref}} >
          <img src={iNCU} alt="iNCU" id="product0" />
          <img src={NCUOS} alt="NCUOS" id="product1" />
          <img src={mainSite} alt="mainSite" id="product2" />
          <img src={other} alt="other" id="product3" />
          <img src={US} alt="US" id="product4" />
        </div>
      </div>
      <div className="introduce-to-group-container">
        <p>认识创造者们</p>
        <img src={arrowDown} alt="向下" onClick={handleArrowClick} />
      </div>
    </div>
  );
}

export default withRouter(ProductIntro);
