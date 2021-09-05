import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const { useState, useEffect } = React;
import { useAppReady } from 'mincu-hooks';
import { AppData } from 'mincu-core';
import { dataModule } from 'mincu-vanilla';
import BackArrow from '../../components/BackArrow';
import './style.css'


const OptionalQuestions: React.FC<RouteComponentProps> = props => {
    let commentsRef: HTMLDivElement
    let token: string
    const handleBackClick = () => {
        props.history.push('/success');
    };
    const [comments, setComments] = useState([])
    const isReady = useAppReady()
    if (isReady) {
        token = dataModule.appData.user.token

        axios({
            method: 'GET',
            url: 'https://2021hrapi.ncuos.com/api/user/',
            headers: {
                'Authorization': 'passport ' + token
            }
        }).then(res => {
            // alert(res.data.data.comments)
            setComments(res.data.data.comments)
            // setComments([])
            // const t1 = anime.timeline()
            // anime({
            //     targets:'.comment-container',
            //     translateX:250,
            //     direction: 'reverse',
            //     autoplay:true,
            // })
        })
    }
    const emptyElement = (
        <div className='comment-container'>
            &nbsp;<br />&nbsp;
            本来无一物，何处惹尘埃。&nbsp;<br /><br />
            --暂无人评论
            <br />&nbsp;
        </div>
    )
    const existElement = (
        comments.map(comment => (
            <div className='comment-container'>
                &nbsp;<br />
                {comment.content}<br /><br />
                --{comment.from} 评论于{comment.CreatedAt}
                <br />&nbsp;
            </div>
        ))
    )
    const commentElement = JSON.stringify(comments) == JSON.stringify([]) ?emptyElement:existElement

    return (

        <div className='optional-container'>
            <BackArrow onClick={handleBackClick} />

            <div className="comments-container" ref={ref => { commentsRef = ref }}>{commentElement}</div>
        </div>
    )
}

export default withRouter(OptionalQuestions)