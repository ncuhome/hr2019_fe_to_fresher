import * as React from 'react';
import './style.css'

interface PropType {
  cover: string;
  title: string;
  author_icon: string;
  author: string;
}

const Tweet: React.FC<PropType> = (props) => {
  const { cover, title, author_icon, author } = props;
  return (
    <div className="tweet-container">
      <img
        src={cover}
        alt="封面"
      />
      <div>
        <h3>{title}</h3>
        <p>
          <img src={author_icon} alt="icon"/>
          &nbsp;
          {author}
        </p>
      </div>
    </div>
  )
}

export default Tweet
