import * as React from 'react';
import anime from 'animejs';
import JoinusForm from '../../components/JoinusForm/index';
import './style.css';

const { useState, useEffect } = React;

const ncuhome = require('../../assets/png/application_ncuhome.png');
const arrowUp = require('../../assets/svg/form_arrow_up.svg');

export default function Application(props: any) {
  const [formValues, setFormValues] = useState({
    name: "",
    gender: "男",
    groupType: "",
    email: "",
    phonenumber: undefined,
    classname: "",
    introduce:""
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
  }

  useEffect(() => {
    // 计算icon位置使表单始终只露出标题
    const heightdif:number = window.innerHeight  -667
    const newMarginBottom:number = heightdif + 100 - (heightdif*0.1);
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
    const circleAnime = anime({
      targets: ".application-container .ncuhome-planet-container img",
      direction: 'normal',
      duration: 500,
      easing: 'easeInOutQuad',
      scale: '1.5'
    });
    circleAnime.pause();
    const disapearAnime = anime.timeline({
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
    disapearAnime.pause();
    const handleScroll = (e:any) => {
      const halfCircleTop = 150 + window.innerHeight * 0.05;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if ((scrollTop > halfCircleTop) && isUpper) {
        setIsUpper(false);
        // console.log(circleAnime.reversed);
        if (circleAnime.reversed) {
          circleAnime.seek(circleAnime.duration);
        }
        circleAnime.play();
        disapearAnime.play();
      }
      else if ((scrollTop < halfCircleTop) && !isUpper) {
        setIsUpper(true);
        circleAnime.reverse();
        circleAnime.seek(circleAnime.duration);
        circleAnime.play();
        disapearAnime.reverse();
        disapearAnime.seek(disapearAnime.duration);
        disapearAnime.play();
      }
    };
    window.addEventListener("scroll",handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll",handleScroll);
    };
  },[isUpper]);

  return (
    <div className="application-container">
      <div className="ncuhome-planet-container">
        <img src={ncuhome} className="ncuhome-planet" alt="ncuhome" />
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="form-container">
        <div className="icon-container">
          <img src={arrowUp}/>
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
    </div>
  )
}