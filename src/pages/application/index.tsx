import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useAppReady } from 'mincu-react'
import { dataModule } from 'mincu-vanilla';
import * as ReactGA from 'react-ga';
import BackArrow from '../../components/BackArrow';
import JoinusForm, { FormType } from '../../components/JoinusForm/index';
import './style.css';
import xiaojiayuan from '../../assets/png/xiaojiayuan.png';
import QRcode from '../../assets/png/QRcode.png';
import ncuhome from '../../assets/png/ncuhome_planet.png';
import arrowUp from '../../assets/svg/form_arrow_up.svg';
import { toast } from 'react-toastify';
import Fire from './Fire';

const { useState, useEffect } = React;

let formRef: HTMLDivElement;
let xjyRef: HTMLDivElement;
const token = dataModule.appData.user.token
const Application: React.FC<RouteComponentProps> = props => {
  const defaultDepartment = props.location.state || '行政组';
  const emptyFprm = {
    name: '',
    gender: '男',
    group: defaultDepartment,
    qq: '',
    phone: '',
    student_id: '',
    intro: '',
    reset: 0
  }
  let defaultValue = localStorage.getItem('formValue') === null ? emptyFprm : JSON.parse(localStorage.getItem('formValue'));

  const isReady = useAppReady()
  //在南大家园app中打开自动填写信息
  if (isReady) {
    const baseInfo = dataModule.appData.user.profile.entireProfile.base_info
    const appInfoForm = {
      name: baseInfo.xm,
      gender: baseInfo.xb.mc,
      group: defaultValue.group,
      qq: baseInfo.qq,
      phone: baseInfo.yddh,
      student_id: baseInfo.xh,
      intro: defaultValue.intro,
      reset: 0
    }
    defaultValue = appInfoForm
  }


  const [formValues, setFormValues] = useState(defaultValue);
  const [isUpper, setIsUpper] = useState(true);
  const [ncuhomeStyle, setNcuhomeStyle] = useState({});
  const [isSumbmiting, setIsSumbmiting] = useState(false);
  const [isBackArrowHidden, setIsBackArrowHidden] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const newValue: FormType = { ...formValues };
    newValue[name] = value;
    localStorage.setItem('formValue', JSON.stringify(newValue));
    setFormValues(newValue);
  };

  const checkValue = (value: FormType) => {
    if (value.student_id.length != 10) {
      toast('请输入正确的学号');
      setIsSumbmiting(false);
      return false
    }
    if (value.intro.length < 15) {
      toast('自我介绍需大于15字')
      setIsSumbmiting(false);
      return false
    }
    if (value.intro.length > 1000) {
      toast('自我介绍需小于1000字')
      setIsSumbmiting(false);
      return false
    }

    const qqreg = new RegExp('^[1-9][0-9]{4,12}$')
    if (!qqreg.test(value.qq)) {
      toast('请输入正确的qq号')
      setIsSumbmiting(false);
      return false
    }
    return true
  }

  const handleSighUp = (value: FormType) => {

    if (!checkValue(value)) { return }

    axios.post('https://2021hrapi.ncuos.com/api/user/', JSON.stringify(value), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // console.log(response)
        const { data, status, statusText } = response;
        // console.log(status)
        if (status === 200) {
          if (data.code === 0) {
            ReactGA.event({
              category: 'Application',
              action: 'Sigh Up success'
            });
            props.history.push('/success');
          }
          else if (data.code === 1) {
            toast(data.msg);
          }

          else if (data.code === 9) {
            toast('信息修改成功！');
            props.history.push('/success');
          }
          else {
            toast('网络有点问题~请稍后重试');
          }
        }
        else {
          toast('未知错误，请重试');
        }
        setIsSumbmiting(false);
      })
      .catch((data) => {
        const code = data.response.data.code
        if (code === 11) {
          toast('不在报名时间')
        }
        else if (code === 5) {
          toast('QQ/电话 已被占用')
        }
        else if (code === 6) {
          toast('学号与姓名不匹配')
        }
        else if (code === 10) {
          toast('已经晋级禁止修改')
        }
        else {
          toast('网络有点问题~请稍后重试或使用南大家园app“加入我们”');
        }
        setIsSumbmiting(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.persist();
    event.preventDefault();
    if (!isSumbmiting) {
      setIsSumbmiting(true);
      // alert('报名通道已关闭！');
      handleSighUp(formValues);
    }
  };

  const handleArrowClick = () => {
    const scrollWindow = anime({
      targets: 'html,body',
      duration: 1000,
      scrollTop: formRef.offsetTop - 10,
      easing: 'easeInOutQuad',
      autoplay: true
    });
  };

  const handleBackClick = () => {
    props.history.push('/department');
  };

  const handleQRcodeClick = () => {
    ReactGA.event({
      category: 'Application',
      action: 'Join our welcome group by Click'
    });
    window.location.href = 'https://qm.qq.com/cgi-bin/qm/qr?k=6AH9HIi3BxjQAw6BJruv7utQ3HZe52R2&jump_from=webapi';
  };

  useEffect(() => {
    // 提示是否报名过
    // axios({
    //   method: 'GET',
    //   url: 'https://2021hrapi.ncuos.com/api/user/',
    //   headers: {
    //     'Authorization': 'passport ' + token
    //   }
    // }).then(res => {
    //   if(res.data.data.step===1){
    //     alert('你已经报过名了噢，请等待后续通知~\n（再次提交可以更新信息）')
    //   }
    // })

    // 计算工作室名称下外边框大小使表单始终只露出标题与姓名栏
    const heightDif: number = window.innerHeight - 667;
    const widthDif: number = window.innerWidth - 375;
    // 以下参数与布局和图片尺寸有关
    const extHeightByHeight = Number(heightDif);
    const extHeightByWidth: number = (window.innerWidth * 0.75) > 400 ? (-120 * 229 / 280) : (-widthDif * 0.75 * 229 / 280);
    const newMarginBottom: number = +160 + extHeightByWidth + extHeightByHeight;
    const arrowAnime = anime({
      targets: '.application-container .icon-container img',
      translateY: ['-40', '-50'],
      loop: true,
      autoplay: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    anime({
      targets: '.back-arrow-container',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    });
    setNcuhomeStyle({
      'marginBottom': `${newMarginBottom}px`,
      'transition': '1s all',
      ...ncuhomeStyle
    });
    return () => {
      anime.running.forEach((instance) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instance.animatables.forEach((animatable: any) => {
          anime.remove(animatable.target);
        });
      });
    };
  }, []);

  useEffect(() => {
    // 由于animejs v3.1的bug，动画倒放会闪现，只能写两个动画，后期再跟进 TODO
    const planetSmallerAnime = anime({
      targets: '.application-container .ncuhome-planet-container img',
      direction: 'normal',
      autoplay: false,
      duration: 500,
      easing: 'easeInOutQuad',
      scale: [2, 1]
    });
    const planetBiggerAnime = anime({
      targets: '.application-container .ncuhome-planet-container img',
      direction: 'normal',
      autoplay: false,
      duration: 500,
      easing: 'easeInOutQuad',
      scale: [1, 2]
    });
    const disapearAnime = anime.timeline({
      autoplay: false,
      duration: 1000,
      easing: 'linear'
    });
    disapearAnime.add({
      targets: '.application-container .icon-container img',
      opacity: [1, 0]
    }, 0)
      .add({
        targets: '.application-container .ncuhome-container',
        opacity: [1, 0]
      }, 0);


    const fireOn = anime({
      targets: '.g-fire-box',
      opacity: 0.9,
      autoplay: false,
      easing: 'linear'
    })
    const fireOff = anime({
      targets: '.g-fire-box',
      opacity: 0,
      autoplay: false,
      easing: 'linear'
    })
    const handleScroll = (e: Event) => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // alert(scrollTop+'+'+windowHeight+'='+scrollHeight)
      window.addEventListener('touchstart', e => {
        const preY = e.targetTouches[0].pageY
        window.ontouchmove = e1 => {
          const nowY = e1.targetTouches[0].pageY
          const distance = preY - nowY
          if (scrollTop + windowHeight >= scrollHeight - 100) {
            fireOn.play()
            if (distance > 0) {
              xjyRef.style.transform = 'translatey(-' + distance + 'px)'
            }
          }
        }
      })


      if (scrollTop + windowHeight < scrollHeight - 100) {
        fireOff.play()
        xjyRef.style.transform = 'translatey(0px)'
      }
      const halfCircleTop = 100 + window.innerHeight * 0.05;
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
      if (scrollTop > (formRef.offsetTop + 10) && !isBackArrowHidden) {
        anime({
          targets: '.back-arrow-container',
          opacity: 0,
          duration: 150,
          easing: 'linear',
          complete: () => {
            setIsBackArrowHidden(true);
          }
        });
      }
      else if (scrollTop <= (formRef.offsetTop + 10) && isBackArrowHidden) {
        anime({
          targets: '.back-arrow-container',
          opacity: 1,
          duration: 150,
          easing: 'linear',
          complete: () => {
            setIsBackArrowHidden(false);
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isUpper, isBackArrowHidden]);

  return (
    <div className="application-container">
      <BackArrow onClick={handleBackClick} isHidden={isBackArrowHidden} />
      <div className="ncuhome-planet-container">
        <img src={ncuhome} className="ncuhome-planet" alt="ncuhome" />
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="form-container" id="form" ref={(Ref) => { formRef = Ref }}>
        <div className="icon-container">
          <img src={arrowUp} onClick={handleArrowClick} />
        </div>
        <div className="divide-line">
          <span />
        </div>
        <div className="headline-container" >
          <p className="english-headline">Ncuhome &nbsp;&nbsp; Application &nbsp; Form</p>
          <p className="headline">星球入驻申请单</p>
          <p className="deadline">报名将于2021年9月21日24时截止</p>
        </div>
        <JoinusForm value={formValues} onChange={handleChange} onSubmit={handleSubmit} />
      </div>
      <img src={QRcode} alt="二维码" id="QRcode" onClick={handleQRcodeClick} />

      <div className="xjyContainer" ref={ref => { xjyRef = ref }}>
        <img src={xiaojiayuan} alt="小家园" id="xiaojiayuan" />
        <Fire/>
      </div>
    </div>
  );
};

export default withRouter(Application);
