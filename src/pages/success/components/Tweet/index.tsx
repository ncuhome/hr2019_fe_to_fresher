import * as React from 'react';
import './style.css'

interface PropType {
  href: string;
  cover: string;
  title: string;
  author_icon: string;
  author: string;
}

const Tweet: React.FC<PropType> = (props) => {
  const { href, cover, title, author_icon, author } = props;
  return (
    <a href={href} className="tweet-container">
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
    </a>
  )
}

export default Tweet
