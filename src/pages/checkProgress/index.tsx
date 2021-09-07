import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import BackArrow from "../../components/BackArrow";
import anime from "animejs";
import './style.css'
import { dataModule } from "mincu-vanilla";
import axios from "axios";

const token = dataModule.appData.user.token
const checkProgress:React.FC<RouteComponentProps> = props =>{
    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'https://2021hrapi.ncuos.com/api/user/',
            headers: {
                'Authorization': 'passport ' + token
            }
        }).then(res => {
            alert(res.data.data.step)
        })
        
        const t0 = anime.timeline({
            autoplay:true
        })
        t0.add({
            targets:'.back-arrow-container',
            opacity:[0,1],
            duration:666,
        })
    },[])

    return (
        <div className="checkProgress-container">
            <BackArrow onClick={()=>{props.history.push('/product')}}/>
            checkProgress
        </div>
    )
}

export default withRouter(checkProgress)