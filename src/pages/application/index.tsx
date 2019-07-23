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
  const [stageIndex, setStageIndex] = useState(0);
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
      targets: '.icon-container img',
      translateY: '10px',
      loop: true,
      autoplay: true,
      direction: 'alternate'
    })
  })

  return (
    <div className="container">
      <div className="circle-container">
        <div className="circle">
        </div>
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="icon-container">
        <img src={circle_arrow} />
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