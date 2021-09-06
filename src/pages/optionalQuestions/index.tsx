import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const { useState, useEffect } = React;
import { useAppReady } from 'mincu-hooks';
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
    useEffect(() => {
        if (isReady) {
            token = dataModule.appData.user.token
    
            axios({
                method: 'GET',
                url: 'https://2021hrapi.ncuos.com/api/user/',
                headers: {
                    'Authorization': 'passport ' + token
                }
            }).then(res => {
                setComments(res.data.data.comments)
            })
        }else {
            setComments([{
                ID: 1,
                CreatedAt: "南大家园星球办公A区25469",
                from: "",
                content: "请于 南大家园app-生活-加入我们 中查收我们对你的留言"
              }])
        }
        const t1 = anime.timeline({
            autoplay: true
        });
        t1.add({
            targets: '.comments-container',
            translateX: [300, 0],
            duration: 666,
            easing: 'linear'
        })
            .add({
                targets: '.back-arrow-container',
                opacity: 1,
                duration: 0,
                easing: 'linear'
            },'-=666')
        return () => {
            anime.running.forEach((animatable: any) => {
                anime.remove(animatable.target)
            })
        }
    }, [])

    const emptyElement = (
        <div className='comment-container'>
            &nbsp;<br />&nbsp;
            本来无一物，何处惹尘埃。&nbsp;<br /><br />
            --暂无人给你留言
            <br />&nbsp;
        </div>
    )
    const existElement = (
        comments.map(comment => (
            <div className='comment-container'>
                &nbsp;<br />
                &nbsp;{comment.content}&nbsp;<br /><br />
                &nbsp;&nbsp;&nbsp;--{comment.from}<br/> 
                &nbsp;评论于{comment.CreatedAt}&nbsp;
                <br />&nbsp;
            </div>
        ))
    )
    const commentElement = JSON.stringify(comments) == JSON.stringify([]) ? emptyElement : existElement

    return (

        <div className='optional-container'>
            <BackArrow onClick={handleBackClick} />
            <div className="comments-container" ref={ref => { commentsRef = ref }}>{commentElement}</div>
        </div>
    )
}

export default withRouter(OptionalQuestions)