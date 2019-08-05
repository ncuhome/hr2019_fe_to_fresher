import * as React from 'react';
import './style.css';

export interface formType {
  name:string
  gender:string,
  department:string,
  email:string,
  phone:string,
  clazz:string,
  introduction:string,
  reset:number,
}

interface propType {
  value: formType,
  onChange: any,
  onSubmit: (event:React.FormEvent<HTMLFormElement>) => void
}

export default function JoinusForm(props:propType) {

  const { name,gender,department,email,phone, clazz,introduction} = props.value;
  const { onChange:handleChange, onSubmit:handleSubmit } = props;

  const isMale = (gender === '男') ? true : false;

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="name">姓名</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="gender">性别</label>
        <span>
          <span className="radio-container">
            <label htmlFor="male" style={{color: isMale ? null : '#9F9F9F'}}>男</label>
            <input type="radio" name="gender" id="male" value="男" defaultChecked onClick={handleChange} />
          </span>
            <span className="radio-container">
            <label htmlFor="female" style={{color: isMale ? '#9F9F9F' : null}}>女</label>
            <input type="radio" name="gender" id="female" value="女" onClick={handleChange} />
          </span>
          <div className="line" style={{
            transform: !isMale ? 'translateX(81px)' : 'translateX(50px)',
            background: !isMale ? '#FF7272' : '#72ADFF'}}/>
        </span>
      </p>
      <p>
        <label htmlFor="department">组别</label>
        <select name="department" id="department" value={department} onChange={handleChange}>
          <option value="行政">行政组</option>
          <option value="运营">运营组</option>
          <option value="产品">产品组</option>
          <option value="设计">设计组</option>
          <option value="研发">研发组</option>
        </select>
      </p>
      <p>
        <label htmlFor="email">电子邮箱</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="phone">手机号码</label>
        <input
          type="tel"
          pattern="^[1]([3-9])[0-9]{9}$"
          name="phone" id="phone"
          value={phone}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="clazz">专业班级</label>
        <input
          type="text"
          name="clazz"
          id="clazz"
          value={clazz}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="introduction">自我介绍</label>
      </p>
      <textarea 
        name="introduction"
        id="introduction"
        placeholder="可以说说自己的爱好，特长和有趣的经历哦~ PS:还可以说说选择该组的理由呢！"
        value={introduction}
        onChange={handleChange}
        required={true}
      />
      <div className="btn-container">
        <input type="submit" value="提交"/>
      </div>
    </form>
  )
}