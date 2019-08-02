import * as React from 'react';
import anime from 'animejs';
// import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BackArrow from '../../components/BackArrow';
import JoinusForm from '../../components/JoinusForm/index';
import './style.css';

const { useState, useEffect } = React;

const xiaojiayuan = require('../../assets/png/xiaojiayuan.png');
const ncuhome = require('../../assets/png/ncuhome_planet.png');
const arrowUp = require('../../assets/svg/form_arrow_up.svg');

let formRef:any;

const Application = (props: any) => {
  const [formValues, setFormValues] = useState({
    name: "",
    gender: "男",
    department: "",
    email: "",
    phone: "",
    clazz: "",
    introduction:""
  });
  const [isUpper, setIsUpper] = useState(true);
  const [ncuhomeStyle, setNcuhomeStyle] = useState({});

  const handleChange = (event:any):void => {
    const { name, value } = event.target;
    const newValue:any = {...formValues};
    newValue[name] = value;
    setFormValues(newValue);
  }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.persist();
    event.preventDefault();
    console.log(formValues);
    // axios.post('http://freshman.guoxy.top/api/freshman/signup',{
      
    // });
  }

  const handleArrowClick = () => {
    const scrollWindow = anime({
      targets: "html,body",
      duration: 1000,
      scrollTop: formRef.offsetTop-10,
      easing: "easeInOutQuad",
      autoplay: true,
    });
  }

  const handleBackClick = (event:any) => {
    props.history.push("/group");
  }

  useEffect(() => {
    // 计算工作室名称下外边框大小使表单始终只露出标题与姓名栏
    const heightDif:number = window.innerHeight  - 667;
    const widthDif:number = window.innerWidth - 375;
    // 以下参数与布局和图片尺寸有关
    const extHeightByHeight: number = heightDif*1.0
    const extHeightByWidth: number = (window.innerWidth*0.75)>400 ? (-120*229/280) : (-widthDif*0.75*229/280);
    const newMarginBottom:number =  + 160 + extHeightByWidth + extHeightByHeight;
    setNcuhomeStyle({
      "marginBottom": `${newMarginBottom}px`,
      "transition": "1s all",
      ...ncuhomeStyle
    });
  },[]);

  useEffect(() => {
    const arrowAnime = anime({
      targets: ".application-container .icon-container img",
      translateY: ["-40","-50"],
      loop: true,
      autoplay: true,
      direction: "alternate",
      easing: 'easeInOutQuad'
    });
  },[]);

  useEffect(() => {
    // 有冗余，但修改会发现bug，TODO
    const planetAnime = anime({
      targets: ".application-container .ncuhome-planet-container img",
      direction: 'normal',
      autoplay: false,
      duration: 500,
      easing: 'easeInOutQuad',
      scale: [1,2],
    });
    const disapearAnime = anime.timeline({
      autoplay: false,
      duration: 1000,
      easing: 'linear'
    });
    disapearAnime.add({
      targets: ".application-container .icon-container img",
      opacity: [1, 0]
    },0)
    .add({
      targets: ".application-container .ncuhome-container",
      opacity: [1, 0]
    },0);
    const handleScroll = (e:any) => {
      const halfCircleTop = 100 + window.innerHeight * 0.05;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if ((scrollTop > halfCircleTop) && isUpper) {
        setIsUpper(false);
        if (planetAnime.reversed) {
          planetAnime.reverse();
        }
        planetAnime.play();
        disapearAnime.play();
      }
      else if ((scrollTop < halfCircleTop) && !isUpper) {
        setIsUpper(true);
        planetAnime.reverse();
        planetAnime.seek(planetAnime.duration);
        planetAnime.play();
        disapearAnime.reverse();
        disapearAnime.seek(disapearAnime.duration);
        disapearAnime.play();
      }
    };
    window.addEventListener("scroll",handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll",handleScroll);
    };
  },[ isUpper ]);

  return (
    <div className="application-container">
      <BackArrow onClick={handleBackClick} />
      <div className="ncuhome-planet-container">
        <img src={ncuhome} className="ncuhome-planet" alt="ncuhome" />
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="form-container" id="form" ref={(Ref) => {formRef=Ref}}>
        <div className="icon-container">
          <img src={arrowUp} onClick={handleArrowClick} />
        </div>
        <div className="divide-line">
          <span />
        </div>
        <div className="headline-container">
          <p className="english-headline">Ncuhome Application Form</p>
          <p className="headline">星球入驻申请单</p>
        </div>
        <JoinusForm value={formValues} onChange={handleChange} onSubmit={handleSubmit} />
      </div>
      <img src={xiaojiayuan} alt="小家园" id="xiaojiayuan"/>
    </div>
  )
}

export default withRouter(Application)