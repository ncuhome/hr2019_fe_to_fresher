import * as React from 'react';
import anime from 'animejs';
import { Link } from 'react-router-dom';
import './style.css';

export default function ProductIntro(props:any) {
  return (
    <div className="productintro-container">
      <Link to="/application">报名直达</Link>
    </div>
  );
}