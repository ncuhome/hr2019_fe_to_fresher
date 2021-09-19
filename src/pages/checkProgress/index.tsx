import React, { useEffect, useState } from "react";
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



const checkProgress: React.FC<RouteComponentProps> = props => {
    const isReady = useAppReady()
    const [groupPic, setGroupPic] = useState()
    const [step, setStep] = useState(-2)
    const [checked, setChecked] = useState(false)
    const [failed, setFailed] = useState(false)
    //被淘汰failed则为true
    const [token, setToken] = useState('')

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

    const handleGroupPic = (group) => {
        switch (group) {
            case '行政组':
                setGroupPic(managePlanet)
                break;
            case '运营组':
                setGroupPic(omPlanet)
                break;
            case '设计组':
                setGroupPic(desighPlanet)
                break;
            case '研发组':
                setGroupPic(devPlanet)
                break;
            case '游戏组':
                setGroupPic(gamePlanet)
                break;
            case '产品组':
                setGroupPic(pmPlanet)
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
            }
        }).then(res => {
            setStep(res.data.data.step)
            setFailed(res.data.data.failed)
            handleGroupPic(res.data.data.info.group)
            setChecked(res.data.data.checked)
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
            case 3:
                return (
                    <div className="progressText-container">
                        <p>恭喜你通过笔试(๑ơ ₃ ơ)♥</p>
                        <p>向进入家园迈进了一大步</p>
                        <p>第一次面试约于9月24日进行</p>
                        <p>记得点击下面的按钮确认参加一面噢~</p>
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
                        <p>恭喜你通过一面(๑ơ ₃ ơ)♥</p>
                        <p>距离进入家园只剩最后一步</p>
                        <p>第二次面试约于9月25日进行</p>
                        <p>记得点击下面的按钮确认参加二面噢~</p>
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
                        <p>恭喜你成为家园工作室的一员！</p>
                        <p>家园线下见面会欢迎你的到来...</p>
                    </div>
                )
            default:
                break;
        }

    }

    useEffect(() => {
        // 动画
        const finalColor = failed === true ? '#c14444' : '#c9780c'//被淘汰为红色
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
                background: '#2ed573',
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
                background: '#2ed573',
            }).add({
                targets: '.progressLine',
                translateX: ['-55vw', '-27.5vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot2',
                background: '#2ed573',
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
                background: '#2ed573',
            }).add({
                targets: '.progressLine',
                translateX: ['-55vw', '-27.5vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot2',
                background: '#2ed573',
                duration: 500
            }).add({
                targets: '.progressLine',
                translateX: ['-27.5vw', '0vw'],
                easing: 'linear',
                duration: 500
            }).add({
                targets: '#progressDot3',
                background: '#2ed573'
            })
        }

    }, [step])


    return (
        <div className="checkProgress-container">
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
                <img src={groupPic} alt="" />
            </div>
            {renderText()}
        </div>
    )
}

export default withRouter(checkProgress)