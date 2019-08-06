import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as ReactGA from 'react-ga';
import BackArrow from '../../components/BackArrow';
import JoinusForm, { formType } from '../../components/JoinusForm/index';
import './style.css';

const { useState, useEffect } = React;

const xiaojiayuan = require('../../assets/png/xiaojiayuan.png');
const QRcode = require('../../assets/png/QRcode.png');
const ncuhome = require('../../assets/png/ncuhome_planet.png');
const arrowUp = require('../../assets/svg/form_arrow_up.svg');

let formRef:any;

const Application = (props: any) => {
  const defaultDepartment = props.location.state || "行政";
  const defaultValue = localStorage.getItem("formValue") === null ? {
    name: "",
    gender: "男",
    department: defaultDepartment,
    email: "",
    phone: "",
    clazz: "",
    introduction:"",
    reset: 0,
  } : JSON.parse(localStorage.getItem("formValue"));
  const [formValues, setFormValues] = useState(defaultValue);
  const [isUpper, setIsUpper] = useState(true);
  const [ncuhomeStyle, setNcuhomeStyle] = useState({});
  const [isSumbmiting, setIsSumbmiting] = useState(false);
  const [isBackArrowHidden, setIsBackArrowHidden] = useState(false);

  const handleChange = (event:any):void => {
    const { name, value } = event.target;
    const newValue:any = {...formValues};
    newValue[name] = value;
    localStorage.setItem("formValue",JSON.stringify(newValue));
    setFormValues(newValue);
  }

  const handleSighUp = (value:formType) => {
    axios.post('http://freshman.guoxy.top/api/freshman/signup',JSON.stringify(value), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      const { data, status, statusText } = response;
      if (status === 200) {
        if (data.status === 1) {
          window.alert("bibi——报名讯号已被接收\n点击下方二维码开启招新群传送门，\n和创造者们会面吧~");
          ReactGA.event({
            category: "Application",
            action: "Sigh Up success",
          });
        }
        else if (data.status === -1) {
          if (window.confirm("该手机已报名，是否修改信息？")) {
            const newFormValue = {...formValues, reset:1};
            handleSighUp(newFormValue);
            ReactGA.event({
              category: "Application",
              action: "Edit profile",
            });
          }
        }
        else {
          window.alert(data.message);
        }
      }
      else {
        window.alert(statusText);
      }
      setIsSumbmiting(false);
    })
    .catch((data) => {
      window.alert("网页有点问题~请稍后重试");
      setIsSumbmiting(false);
    });
  }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.persist();
    event.preventDefault();
    if (!isSumbmiting) {
      setIsSumbmiting(true);
      handleSighUp(formValues);
    }
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

  const handleBackClick = () => {
    props.history.push("/department");
  }

  const handleQRcodeClick = () => {
    ReactGA.event({
      category: "Application",
      action: "Join our welcome group by Click",
    });
    window.location.href="https://jq.qq.com/?_wv=1027&k=5kst7Wj";
  }

  useEffect(() => {
    // 计算工作室名称下外边框大小使表单始终只露出标题与姓名栏
    const heightDif:number = window.innerHeight  - 667;
    const widthDif:number = window.innerWidth - 375;
    // 以下参数与布局和图片尺寸有关
    const extHeightByHeight: number = heightDif*1.0
    const extHeightByWidth: number = (window.innerWidth*0.75)>400 ? (-120*229/280) : (-widthDif*0.75*229/280);
    const newMarginBottom:number =  + 160 + extHeightByWidth + extHeightByHeight;
    const arrowAnime = anime({
      targets: ".application-container .icon-container img",
      translateY: ["-40","-50"],
      loop: true,
      autoplay: true,
      direction: "alternate",
      easing: 'easeInOutQuad'
    });
    anime({
      targets: ".back-arrow-container",
      opacity: [0,1],
      duration: 1000,
      easing: "linear",
    });
    setNcuhomeStyle({
      "marginBottom": `${newMarginBottom}px`,
      "transition": "1s all",
      ...ncuhomeStyle
    });
    return () => {
      anime.running.forEach((instance) => {
        instance.animatables.forEach((animatable:any)=>{
          anime.remove(animatable.target);
        })
      });
    }
  },[]);

  useEffect(() => {
    // 由于animejs v3.1的bug，动画倒放会闪现，只能写两个动画，后期再跟进 TODO
    const planetSmallerAnime = anime({
      targets: ".application-container .ncuhome-planet-container img",
      direction: 'normal',
      autoplay: false,
      duration: 500,
      easing: 'easeInOutQuad',
      scale: [2,1],
    });
    const planetBiggerAnime = anime({
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
        planetBiggerAnime.play();

        disapearAnime.play();
      }
      else if ((scrollTop < halfCircleTop) && !isUpper) {
        setIsUpper(true);
        planetSmallerAnime.play();

        disapearAnime.reverse();
        disapearAnime.seek(disapearAnime.duration);
        disapearAnime.play();
      }
      // 处理左上角返回箭头
      if (scrollTop > (formRef.offsetTop+10) && !isBackArrowHidden) {
        anime({
          targets: ".back-arrow-container",
          opacity: 0,
          duration: 150,
          easing: "linear",
          complete: () => {
            setIsBackArrowHidden(true);
          }
        });
      }
      else if (scrollTop <= (formRef.offsetTop+10) && isBackArrowHidden) {
        anime({
          targets: ".back-arrow-container",
          opacity: 1,
          duration: 150,
          easing: "linear",
          complete: () => {
            setIsBackArrowHidden(false);
          }
        });
      }
    }
    window.addEventListener("scroll",handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll",handleScroll);
    }
  },[ isUpper, isBackArrowHidden ]);

  return (
    <div className="application-container">
      <BackArrow onClick={handleBackClick} isHidden={isBackArrowHidden}/>
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
      <img src={QRcode} alt="二维码" id="QRcode" onClick={handleQRcodeClick} />
      <img src={xiaojiayuan} alt="小家园" id="xiaojiayuan"  />
    </div>
  )
}

export default withRouter(Application)
