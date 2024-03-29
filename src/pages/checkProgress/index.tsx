import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import BackArrow from "../../components/BackArrow";
import anime from "animejs";
import './style.css'
import { dataModule } from "mincu-vanilla";
import { useAppReady } from "mincu-hooks";
import axios from "axios";

import landing from '../../assets/png/success_landing.png'
import managePlanet from '../../assets/png/introduce_manage_planet.png'
import omPlanet from '../../assets/png/introduce_om_planet.png'
import pmPlanet from '../../assets/png/introduce_pm_planet.png'
import desighPlanet from '../../assets/png/introduce_desigh_planet.png'
import devPlanet from '../../assets/png/introduce_dev_planet.png'
import gamePlanet from '../../assets/png/introduce_game_planet.png'
import { toast } from "react-toastify";



const checkProgress: React.FC<RouteComponentProps> = props => {
    const isReady = useAppReady()
    const [name, setName] = useState('')
    const [group, setGroup] = useState('运营组')
    const [groupPic, setGroupPic] = useState()
    const [step, setStep] = useState(-2)
    const [checked, setChecked] = useState(false)
    const [failed, setFailed] = useState(false)
    //被淘汰failed则为true
    const [token, setToken] = useState('')
    const [place1, setPlace1] = useState('信工楼E316')
    const [isZoom, setZoom] = useState(true)

    const imgRef = useRef(null)
    const pageRef = useRef(null)

    const handleCheckBtn = () => {
        axios({
            method: 'patch',
            url: 'https://2021hrapi.ncuos.com/api/user/',
            headers: {
                'Authorization': 'passport ' + token
            }
        }).then(res => {
            if (res.data.code === 0) {
                setChecked(true)
            }
        })
    }

    const handleGroupPic = (group = '运营组') => {
        switch (group) {
            case '行政组':
                setGroupPic(managePlanet)
                setPlace1('信工楼E445')
                break;
            case '运营组':
                setGroupPic(omPlanet)
                setPlace1('信工楼E316')
                break;
            case '设计组':
                setGroupPic(desighPlanet)
                setPlace1('信工楼E331')
                break;
            case '研发组':
                setGroupPic(devPlanet)
                setPlace1('信工楼E414')
                break;
            case '游戏组':
                setGroupPic(gamePlanet)
                setPlace1('信工楼E444')
                break;
            case '产品组':
                setGroupPic(pmPlanet)
                setPlace1('信工楼E316')
                break;
            default:
                setGroupPic(landing)
                break;
        }
    }



    useEffect(() => {
        if (isReady) {
            setToken(dataModule.appData.user.token)

        } else {
            //pc测试改这里
            setStep(-1)//默认-1
            setFailed(false)//默认false
            setGroupPic(landing)//默认landing
        }
    }, [isReady])

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://2021hrapi.ncuos.com/api/user/',
            headers: {
                'Authorization': 'passport ' + token
                // 'Authorization': ''
            }
        }).then(res => {
            setName(res.data.data.info.name)
            setFailed(res.data.data.failed)
            setGroup(res.data.data.info.group)
            handleGroupPic(res.data.data.info.group)
            setChecked(res.data.data.checked)
            setStep(res.data.data.step)
            // setStep(5)
        }).catch(err => {
            // toast('正在获取进度信息')
        })
    }, [token])

    const renderText = () => {
        if (failed === true) {
            return (
                <div className="progressText-container">
                    <p>很遗憾,</p>
                    <p>你与家园的本次旅程到此结束了,</p>
                    <p>大学半秩时光，仍有无限可能。</p>
                    <p>不要灰心，不必难过，</p>
                    <p>我们一直在这里，期待与你再次相逢。</p>
                    <p>祝好!</p>
                </div>
            )
        }
        switch (step) {
            case -1:
                return (
                    <div className="progressText-container">
                        <p>请在南大家园app-生活-加入我们中打开</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                )
            case 0:
                return (
                    <div className="progressText-container">
                        <p>你还没有报名喔</p>
                        <p>小家园期待你的加入 (*≧▽≦)</p>
                        <div className="progressToJoinus">
                            <Link to='/application'>报名直达</Link>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="progressText-container">
                        <p>你已经成功报名啦٩(^ᴗ^)۶</p>
                        <p>笔试约在9月22日进行</p>
                        <p>请保持学习并等待后续通知</p>
                        <p>加油(ง •_•)ง</p>
                        <br />
                        <div className="progressToComments">
                            <div className="arrow" />
                            <Link to='/comments'>看看留言</Link>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="progressText-container">
                        <p>你已经进入笔试啦٩(^ᴗ^)۶</p>
                        <p>{group}笔试于9月22日18:30</p>
                        <p>在{place1}进行</p>
                        <p>加油(ง •_•)ง</p>
                        <br />
                        <div className="progressToComments">
                            <div className="arrow" />
                            <Link to='/comments'>看看留言</Link>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="progressText-container">
                        <p>恭喜你通过笔试٩(^ᴗ^)۶</p>
                        <p>向进入家园迈进了一大步</p>
                        <p>第一次面试的时间和地点</p>
                        <p>请关注聊天或短信通知哟</p>
                        <p>可以点击下面的按钮确认参加一面噢~</p>
                        <br />
                        <div className={"confirmBtn-container " + 'check' + checked} onClick={handleCheckBtn}>
                            <span hidden={checked}>&nbsp;确认继续&nbsp;</span>
                            <span hidden={!checked}>&nbsp;已确认&nbsp;</span>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="progressText-container">
                        <p>恭喜你通过一面٩(^ᴗ^)۶</p>
                        <p>距离进入家园只剩最后一步</p>
                        <p>第二次面试的时间和地点</p>
                        <p>请关注聊天或短信通知哟</p>
                        <p>可以点击下面的按钮确认参加二面噢~</p>
                        <br />
                        <div className={"confirmBtn-container " + 'check' + checked} onClick={handleCheckBtn}>
                            <span hidden={checked}>&nbsp;确认继续&nbsp;</span>
                            <span hidden={!checked}>&nbsp;已确认&nbsp;</span>
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="progressText-container">
                        <p>{name} 同学你好，</p>
                        <p>在笔试、一面、二面中，</p>
                        <p>你一路披荆斩棘，</p>
                        <p>现在终于到了宣布结果的时候：</p>
                        <p>恭喜你成为家园工作室{group}的一员!</p>
                        <p>因为你的选择与努力，</p>
                        <p>我们终于在家园相遇，</p>
                        <p>家园工作室的每一位成员</p>
                        <p>都在期待与你的相见!</p>
                    </div>
                )
            default:
                break;
        }

    }

    useEffect(() => {
        // 进度条动画
        const finalColor = failed === true ? '#F7392E' : '#666'//被淘汰为红色
        const t0 = anime.timeline({
            autoplay: true
        })
        t0.add({
            targets: '.back-arrow-container',
            opacity: 1,
            duration: 666,
        })
        if (step === 1 || step === 2) {
            t0.add({
                targets: '#progressDot1',
                background: finalColor,
            })
        }
        if (step === 3) {
            t0.add({
                targets: '#progressDot1',
                background: '#FFFFFF',
            }).add({
                targets: '.progressLine',
                translateX: ['-55vw', '-27.5vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot2',
                background: finalColor
            })
        }
        if (step === 4) {
            t0.add({
                targets: '#progressDot1',
                background: '#FFFFFF',
            }).add({
                targets: '.progressLine',
                translateX: ['-55vw', '-27.5vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot2',
                background: '#FFFFFF',
                duration: 500
            }).add({
                targets: '.progressLine',
                translateX: ['-27.5vw', '0vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot3',
                background: finalColor
            })
        }
        if (step === 5) {
            t0.add({
                targets: '#progressDot1',
                background: '#FFFFFF',
            }).add({
                targets: '.progressLine',
                translateX: ['-55vw', '-27.5vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot2',
                background: '#FFFFFF',
                duration: 500
            }).add({
                targets: '.progressLine',
                translateX: ['-27.5vw', '0vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot3',
                background: '#FFFFFF'
            })
        }
    }, [step])

    useEffect(() => {
        //组别图片缩放动画
        const handleScroll = (e: Event) => {
            let scrollTop = pageRef.current.scrollTop ;
            // toast(scrollTop+' '+(imgRef.current.offsetTop-100))
            if (scrollTop > (imgRef.current.offsetTop-130) && !isZoom) {
                anime({
                  targets: '.groupPic-container img',
                  scale:'0.7',
                  duration: 100,
                  translateY:80,
                  easing: 'linear',
                  complete: () => {
                    setZoom(true);
                  }
                });
              }
              else if (scrollTop <= (imgRef.current.offsetTop-130) && isZoom) {
                anime({
                  targets: '.groupPic-container img',
                  scale:'1',
                  duration: 100,
                  translateY:0,
                  easing: 'linear',
                  complete: () => {
                    setZoom(false);
                  }
                });
              }
        }
        
        pageRef.current.addEventListener('scroll', handleScroll);


        return function cleanup() {
            pageRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [isZoom]);

    return (
        <div className="checkProgress-container" ref={pageRef}>
            <BackArrow onClick={() => { props.history.push('/product') }} />
            <div className="progressBar-container">
                <div className="dots-container">
                    <span id='progressDot1'></span>
                    <span id='progressDot2'></span>
                    <span id='progressDot3'></span>
                </div>
                <div className="progressLine"></div>
            </div>

            <div className="groupPic-container">
                <img src={groupPic} alt="" ref={imgRef} />
            </div>
            {renderText()}
        </div>
    )
}

export default withRouter(checkProgress)