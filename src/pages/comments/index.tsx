import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const { useState, useEffect } = React;
import { useAppReady } from 'mincu-hooks';
import { dataModule } from 'mincu-vanilla';
import BackArrow from '../../components/BackArrow';
import './style.css'

function formatTime(date:Date) {
    /* 从Date对象（标准时间格式）返回对应数据 */
    var date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return year + '年' + month + '月' + day+'日'+hour+'时'+minute+'分';
    }

const comments: React.FC<RouteComponentProps> = props => {
    let commentsRef: HTMLDivElement
    let token: string
    const [comments, setComments] = useState([])
    const isReady = useAppReady()
    const [likes, setLikes] = useState(0)

    const handleBackClick = () => {
        props.history.push('/checkProgress');
    };
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
                setLikes(res.data.data.likes)
            })
        } else {
            setComments([{
                ID: 1,
                CreatedAt: new Date(),
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
            opacity: [.5, 1],
            duration: 666,
            easing: 'linear'
        })
            .add({
                targets: '.back-arrow-container',
                opacity: 1,
                duration: 0,
                easing: 'linear'
            }, '-=666')
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
                &nbsp;&nbsp;&nbsp;--{comment.from}<br />
                &nbsp;留言于{formatTime(comment.CreatedAt)}&nbsp;
                <br />&nbsp;
            </div>
        ))
    )
    const commentElement = JSON.stringify(comments) === JSON.stringify([]) ? emptyElement : existElement


    const likesElement = (
        <div className="likes-container" hidden={likes===0}>
            获赞：{likes}❤
        </div>
    )
    return (

        <div className='commentsPage-container'>
            <BackArrow onClick={handleBackClick} />
            {likesElement}
            <div className="comments-container" ref={ref => { commentsRef = ref }}>
                {commentElement}
            </div>
        </div>
    )
}

export default withRouter(comments)