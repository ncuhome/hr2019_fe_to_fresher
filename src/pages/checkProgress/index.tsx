import React, { useEffect, useState } from "react";
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import BackArrow from "../../components/BackArrow";
import anime from "animejs";
import './style.css'
import { dataModule } from "mincu-vanilla";
import { useAppReady } from "mincu-hooks";
import axios from "axios";
import landing from '../../assets/png/success_landing.png'


const checkProgress: React.FC<RouteComponentProps> = props => {
    const isReady = useAppReady()
    // let step = -1
    const [step, setStep] = useState(-2)
    let failed = true
    //未通过为false

    const [progressTextElement, setText] = useState((
        <div className="progressText-container">

        </div>
    ))





    useEffect(() => {
        if (isReady) {
            const token = dataModule.appData.user.token
            axios({
                method: 'GET',
                url: 'https://2021hrapi.ncuos.com/api/user/',
                headers: {
                    'Authorization': 'passport ' + token
                }
            }).then(res => {
                setStep(res.data.data.step)
                failed = res.data.data.failed
            })
        } else {
            setStep(-1)
        }
    }, [isReady])



    useEffect(() => {
        // alert(step)
        switch (step) {
            case -1:
                setText((
                    <div className="progressText-container">
                        <p>请在南大家园app-生活-加入我们中打开</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                ))
                break;
            case 0:
                setText((
                    <div className="progressText-container">
                        <p>你还没有报名喔</p>
                        <p>小家园期待你的加入 (*≧▽≦)</p>
                        <div className="progressToJoinus">
                            <Link to='/application'>报名直达</Link>
                        </div>
                    </div>
                ))
                break;
            case 1:
                setText((
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
                ))
                break;
            case 2:
                setText((
                    <div className="progressText-container">
                        <p>结果暂未公布</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                ))
                break;
            case 3:
                setText((
                    <div className="progressText-container">
                        <p>结果暂未公布</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                ))
                break;
            case 4:
                setText((
                    <div className="progressText-container">
                        <p>结果暂未公布</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                ))
            case 5:
                setText((
                    <div className="progressText-container">
                        <p>结果暂未公布</p>
                        <p>小家园接收不到信号o(TへTo)</p>
                    </div>
                ))
                break;
            default:
                break;
        }

        // 动画
        const t0 = anime.timeline({
            autoplay: true
        })
        t0.add({
            targets: '.back-arrow-container',
            opacity: 1,
            duration: 666,
        }).add({
            targets: '#progress' + step,
            background: 'rgb(0,200,0)',
        })
    }, [step])


    return (
        <div className="checkProgress-container">
            <BackArrow onClick={() => { props.history.push('/product') }} />
            <div className="progressBar-container">
                <span id='progress1'></span>
                <span></span>
                <span></span>
            </div>

            <div className="groupPic-container">
                <img src={landing} alt="" />
            </div>
            {progressTextElement}
            {/* <div className="progressText-container">
                <p>结果暂未公布</p>
                <p>小家园接收不到信号o(TへTo)</p>
            </div> */}
        </div>
    )
}

export default withRouter(checkProgress)