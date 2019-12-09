import * as React from 'react';
import './style.css';

const arrow = require('../../assets/svg/back_arrow.svg');

interface PropType {
  isHidden?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BackArrow: React.FC<PropType> = props => {
  const { isHidden = false } = props;
  return (
    <div className="back-arrow-container" onClick={props.onClick} hidden={isHidden}>
      <img src={arrow} alt="返回" />
    </div>
  );
};

export default BackArrow;
