import * as React from 'react';
import anime from 'animejs';
import { Icon } from 'antd';
import './style.css';

const { useState } = React;

interface propsValue {
  isMobile?: boolean
}

export default class Introduce extends React.Component<propsValue> {
  myRef: any
  animeRef: anime.AnimeInstance;

  constructor(props:propsValue) {
    super(props)
    this.state={
      index: 0
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log(this);

  }

  componentDidUpdate() {
    this.animeRef = anime({
      targets: this.myRef,
      translateY: '10px',
      loop: true,
      autoplay: true,
      direction: 'alternate'
    });
  }

  render() {
    return (
      <div className="container">
      <div className="letter-container">
        <div className="letter">
          <p>Hi~</p>
          <p>这里是NCUHOME星系</p>
          <p>很开心与你在这相遇</p>
          <p>这里是NCUHOME星系</p>
          <p>这里是NCUHOME星系</p>
          <p>这里是NCUHOME星系</p>
          <p>这里是NCUHOME星系</p>
        </div>
      </div>
      <div className="pointer" ref={el => { this.myRef = el;}}>
        <Icon type="like" />
      </div>
    </div>
    );
  }
}
