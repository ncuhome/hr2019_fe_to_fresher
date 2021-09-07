import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import BackArrow from "../../components/BackArrow";
import anime from "animejs";
import './style.css'
import { dataModule } from "mincu-vanilla";
import axios from "axios";

const token = dataModule.appData.user.token
const checkProgress:React.FC<RouteComponentProps> = props =>{
    const [step,setStep] = useState(1)
    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'https://2021hrapi.ncuos.com/api/user/',
            headers: {
                'Authorization': 'passport ' + token
            }
        }).then(res => {
            // alert(res.data.data.step)
            setStep(res.data.data.step)
        })


        // let progressTextElement:HTMLElement
        // switch(step){
        //     case 0:
        //         progressTextElement = (
        //             <p>暂未报名</p>
        //         )
        //         break
        // }
        

        // 动画
        const t0 = anime.timeline({
            autoplay:true
        })
        t0.add({
            targets:'.back-arrow-container',
            opacity:[0,1],
            duration:666,
        }).add({
            targets:'#progress'+step,
            background:'rgb(0,200,0)',
        })
    },[])
 
    return (
        <div className="checkProgress-container">
            <BackArrow onClick={()=>{props.history.push('/product')}}/>
            <div className="progressBar-container">
                <span id='progress1'>1</span>
                <span>2</span>
                <span>3</span>
            </div>

            <div className="groupPic-container">

            </div>

            <div className="progressText-container">
                <p>结果暂未公布</p>
                <p>小家园接收不到信号o(TへTo)</p>
            </div>
        </div>
    )
}

export default withRouter(checkProgress)