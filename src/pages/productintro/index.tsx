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

  const handleItemClick = (event:MouseEvent) => {
    const imgDom:any = event.target;
    const itemIndex = itemArray.indexOf(imgDom.alt);
    const rotateStep = rotateArray[index][itemIndex];
    if (itemIndex === index || isAnimeing) {
      event.preventDefault();
    }
    else {
      anime.remove(`.productintro-container .product-item-container #product${index}`);
      anime.set(`.productintro-container .product-item-container #product${index}`, {
        translateY: 0,
      });
      setIsAnimeing(true);
      setIndex(itemIndex);
      startRotate(rotateStep);
    }
  };

  const handleArrowClick = () => {
    const t1 = anime.timeline({
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
        props.history.push("/group");
      }
    },"1000");
  }

  const startRotate = (rotateStep:number) => {
    const productPlanetAnime = anime({
      targets: ".productintro-container .product-planet-container",
      rotate: `+=${-rotateStep*72.0}`,
      duration: 2000,
      easing: "easeOutElastic",
      autoplay: true,
    });
    productPlanetAnime.finished.then(()=>{
      setIsAnimeing(false);
    });
  }
  
  useEffect(() => {
    itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
      const deg = 72*key;
      const changeHeight = (document.body.clientHeight * 20)/(document.body.clientWidth);
      child.style["top"] = `${changeHeight-40*Math.sin((90-deg)*Math.PI/180)}vw`;
      child.style["left"] = `${30+40*Math.cos((90-deg)*Math.PI/180)}vw`;
      child.style["transform"] = `rotate(${deg}deg)`;
    });
    setIsAnimeing(true);
    const startAnime = anime({
      targets: ".productintro-container .product-planet-container",
      rotate: 720,
      duration: 4000,
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
    itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
      child.addEventListener("click",handleItemClick);
    });
    return () => {
      itemContainerRef.childNodes.forEach((child:HTMLElement,key) => {
        child.removeEventListener("click",handleItemClick);
      });
    };
  },[ isAnimeing ]);

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
        <p className="product-name">{products[0].name}</p>
        <div className="product-description-container">
          {products[0].description.map((line:string,index:number)=>(<p key={index}>{line}</p>))}
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
