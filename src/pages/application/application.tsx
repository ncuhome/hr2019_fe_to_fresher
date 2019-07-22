import * as React from 'react';
import './style.css';

const { useState } = React;

export default function Application(props: any) {
  const [formValues, setFormValues] = useState(null);

  return (
    <div>
      我是一个报名表
    </div>
  )
}