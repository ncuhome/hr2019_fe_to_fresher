import * as React from 'react';
import anime from 'animejs';
import JoinusForm from '../../components/JoinusForm/index';
import './style.css';

const { useState, useEffect } = React;


const circle_arrow = require('../../assets/svg/circle_arrow.svg');


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
    console.log(name+' '+value);
    console.log(formValues);
  }

  useEffect(() => {
    // 计算icon位置使表单始终只露出标题
    const heightdif:number = document.body.clientHeight -667
    const newMarginBottom:number = heightdif + 100 - (heightdif*0.10);
    setNcuhomeStyle({
      "marginBottom": `${newMarginBottom}px`,
      "transition": "1s all",
      ...ncuhomeStyle
    });
  },[]);

  useEffect(() => {
    anime({
      targets: ".icon-container img",
      translateY: "10px",
      loop: true,
      autoplay: true,
      direction: "alternate",
      easing: 'easeInOutSine',
    });
    const setting = {
      direction: 'normal',
      duration: 500,
      easing: 'easeInOutSine'
    };
    const t1 = anime.timeline(setting);
    t1.add({
      targets: ".circle",
      width: "100vw",
      borderTopLeftRadius: "0%",
      borderTopRightRadius: "0%",
    });
    t1.pause();
    function handleScroll(e:any) {
      const halfCircleTop = 150 + document.body.clientHeight * 0.05;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(isUpper);
      console.log(halfCircleTop+" " +scrollTop);
      if ((scrollTop > halfCircleTop) && isUpper) {
        setIsUpper(false);
        t1.play();
      }
      else if ((scrollTop < halfCircleTop) && !isUpper) {
        setIsUpper(true);
        t1.reverse();
        t1.play();
      }
    };
    window.addEventListener("scroll",handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll",handleScroll);
    };
  });

  return (
    <div className="container">
      <div className="circle-container">
        <div className="circle" id="mycircle">
        </div>
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="icon-container">
        <img src={circle_arrow}/>
      </div>
      <div className="form-container">
        <div className="divide-line">
          <span />
        </div>
        <div className="headline-container">
          <p className="english-headline">Ncuhome Application Form</p>
          <p className="headline">星球入驻申请单</p>
        </div>
        <JoinusForm value={formValues} onChange={handleChange} />
      </div>
    </div>
  )
}