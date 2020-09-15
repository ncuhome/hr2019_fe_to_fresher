import * as React from 'react';
import './style.css'
import Tweet from './components/Tweet'
import landing from '../../assets/png/success_landing.png'
import arrow from '../../assets/svg/success_arrow.svg'
import cover_work from '../../assets/png/success_cover-1.png'
import zhihu_icon from '../../assets/svg/zhihu-icon.svg'
import cover_mario from '../../assets/png/success_cover-2.png'
import bilibili_icon from '../../assets/svg/bilibili-icon.svg'
import cover_hackthon from '../../assets/jpg/success_cover-hackthon.jpg'
import wechat_icon from '../../assets/png/wechat-icon.png'
import cover_4years from '../../assets/jpg/success_cover-4years.jpg'
import yuque_icon from '../../assets/png/yuque-icon.png'
import cover_internship from '../../assets/jpg/success_cover-internship.jpg'

interface TweetType {
  href: string;
  cover: any;
  title: string;
  author_icon: any;
  author: string;
}


const Tweets: TweetType[] = [
  {
    href: 'https://www.zhihu.com/question/61745974',
    cover: cover_work,
    title: '在南昌大学家园工作室工作是怎样一种体验？',
    author_icon: zhihu_icon,
    author: '来自知乎er的回答'
  },
  {
    href: 'https://www.bilibili.com/video/BV1a441167tw',
    cover: cover_mario,
    title: '在南昌大学家园工作室工作是怎样一种体验？',
    author_icon: bilibili_icon,
    author: '来自家园工作室的小破站'
  },
  {
    href: 'https://mp.weixin.qq.com/s/WV4S1nVBPXmfiHYlbdQqXA',
    cover: cover_hackthon,
    title: '校园黑客马拉松，一次想法与技术的竞技',
    author_icon: wechat_icon,
    author: '来自南昌大学家园网'
  },
  {
    href: 'https://ncuhome.yuque.com/books/share/e98759b8-1561-41a0-a80a-db3f3a65b727?#',
    cover: cover_4years,
    title: '家园四年，成长与变革',
    author_icon: yuque_icon,
    author: '来自已经毕业的子健学长'
  },
  {
    href: 'https://mp.weixin.qq.com/s/YEgZ3hpNZiN2_CGM58t9Cg',
    cover: cover_internship,
    title: '家园人谈实习，毕业去哪儿',
    author_icon: wechat_icon,
    author: '来自南昌大学家园网'
  }
]

const Success: React.FC = () => {
  const content = Tweets.map(tweet =>
    <Tweet
      href={tweet.href}
      cover={tweet.cover}
      title={tweet.title}
      author_icon={tweet.author_icon}
      author={tweet.author}
    />
  )
  return (
    <div className="success-container" >
      <div className="success-tip" >
        <div>
          <div className="content">
            <div>
              <h1>申请成功！</h1>
              <p>
                点击加入贵宾席 等待登船
                <img src={arrow} alt="箭头" />
              </p>
            </div>
            <p>
              乘客 ID ： TRAPPIST-1b-74282
            </p>
          </div>
          <a href="https://jq.qq.com/?_wv=1027&k=rA9xZO2R">
            <img src={landing} alt="着陆" />
          </a>
        </div>
      </div>
      <div className="msg">
        <h2>宇宙漫游指北</h2>
        {content}
      </div>
    </div>
  )
};

export default Success;
