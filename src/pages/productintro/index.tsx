import * as React from 'react';
import anime from 'animejs';
import { Link } from 'react-router-dom';
import config from '../../config';
import './style.css';

const { products } = config;

export default function ProductIntro(props:any) {

  return (
    <div className="productintro-container">
      <div className="joinlink-container">
        <span className="joinlink">
          <Link to="/application">报名直达</Link>
        </span>
      </div>
      <div className="product-introduce-container">
        <p className="product-name">{products[0].name}</p>
        <div className="product-description-container">
          {products[0].description.map((line:string)=>(<p>{line}</p>))}
        </div>
      </div>
    </div>
  );
}