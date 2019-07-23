import * as React from 'react';
import anime from 'animejs';
import './style.css';

const { useState, useEffect } = React;

const circle_arrow = require('../../assets/svg/circle_arrow.svg');

export default function Application(props: any) {
  const [formValues, setFormValues] = useState(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [ncuhomeStyle, setNcuhomeStyle] = useState({});

  useEffect(() => {
    // 计算icon位置使表单始终只露出标题
    const heightdif:number = document.body.clientHeight -667
    const newMarginBottom:number = heightdif + 100 - (heightdif*0.10);
    setNcuhomeStyle({
      "marginBottom": `${newMarginBottom}px`,
      "transition": "1s all",
      ...ncuhomeStyle
    });
  },[]);

  useEffect(() => {
    anime({
      targets: '.icon-container',
      translateY: '10px',
      loop: true,
      autoplay: true,
      direction: 'alternate'
    })
  })

  return (
    <div className="container">
      <div className="planet-container">
        <div className="planet">
        </div>
      </div>
      <div className="ncuhome-container">
        <p style={ncuhomeStyle}>家园工作室</p>
      </div>
      <div className="icon-container">
        <img src={circle_arrow} />
      </div>
      <div className="form-container">
        <div className="divide-line">
          <span />
        </div>
        <div className="headline-container">
          <p className="english-headline">Ncuhome Application Form</p>
          <p className="headline">星球入驻申请单</p>
        </div>
        <form className="form">
          <p>
            <label htmlFor="name">姓名</label>
            <input type="text" name="name" id="name"/>
          </p>
          <p>
            <label htmlFor="gender">性别</label>
            <span>
              <label htmlFor="male">男</label>
              <input type="radio" name="gender" id="male"/>
              <label htmlFor="female">女</label>
              <input type="radio" name="gender" id="female"/>
            </span>
          </p>
          <p>
            <label htmlFor="sid">学号</label>
            <input type="text" name="sid" id="sid"/>
          </p>
          <p>
            <label htmlFor="groupType">组别</label>
            <select name="groupType" id="groupType">
              <option value="设计">设计组</option>
              <option value="研发">研发组</option>
              <option value="运营">运营组</option>
              <option value="产品">产品组</option>
              <option value="行政">行政组</option>
            </select>
          </p>
          <p>
            <label htmlFor="telephone">TEL</label>
            <input type="tel" name="telephone" id="telephone"/>
          </p>
          <p>
            <label htmlFor="email">邮箱</label>
            <input type="email" name="email" id="email"/>
          </p>
          <p>
            <select name="socialMedia" id="socialMedia">
              <option value="QQ">QQ</option>
            </select>
            <input type="text" placeholder="请选填自己活跃的社交账号（运营必填）"/>
          </p>
          <p>
            <label htmlFor="introduce">自我介绍</label>
          </p>
          <p>
            <textarea 
              name="introduce"
              id="introduce"
              cols={30}
              rows={10}
              placeholder="可以说说自己的爱好，特长和有趣的经历哦~ PS:还可以说说选择该组的理由呢！"
            />
          </p>
          <div className="btn-container">
            <button type="submit">提交</button>
          </div>
        </form>
      </div>
    </div>
  )
}