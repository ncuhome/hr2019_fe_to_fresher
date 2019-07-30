import * as React from 'react';
import './style.css';

export interface formType {
  value:{
    name:string
    gender:string,
    groupType:string,
    email:string,
    phonenumber:string,
    classname:string,
    introduce:string
  },
  onChange: any,
  onSubmit: (event:React.FormEvent<HTMLFormElement>) => void
}

export default function JoinusForm(props:formType) {

  const { name,gender,groupType,email,phonenumber, classname,introduce} = props.value;
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
        <span className="radio-container">
          <label htmlFor="male">男</label>
          <input type="radio" name="gender" id="male" value="男" defaultChecked onClick={handleChange} />
          <span style={{visibility: (!isMale ? "hidden": "visible")}} />
        </span>
        <span className="radio-container">
          <label htmlFor="female">女</label>
          <input type="radio" name="gender" id="female" value="女" onClick={handleChange} />
          <span style={{visibility: (isMale ? "hidden": "visible")}} />
        </span>
      </p>
      <p>
        <label htmlFor="groupType">组别</label>
        <select name="groupType" id="groupType" value={groupType} onChange={handleChange}>
          <option value="设计">设计组</option>
          <option value="研发">研发组</option>
          <option value="运营">运营组</option>
          <option value="产品">产品组</option>
          <option value="行政">行政组</option>
        </select>
      </p>
      <p>
        <label htmlFor="email">邮箱</label>
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
        <label htmlFor="phonenumber">手机号码</label>
        <input
          type="tel"
          pattern="/^[1]([3-9])[0-9]{9}$/"
          name="phonenumber" id="phonenumber"
          value={phonenumber}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="class">专业班级</label>
        <input
          type="text"
          name="classname"
          id="classname"
          value={classname}
          onChange={handleChange}
          required={true}
        />
      </p>
      <p>
        <label htmlFor="introduce">自我介绍</label>
      </p>
      <textarea 
        name="introduce"
        id="introduce"
        placeholder="可以说说自己的爱好，特长和有趣的经历哦~ PS:还可以说说选择该组的理由呢！"
        value={introduce}
        onChange={handleChange}
        required={true}
      />
      <div className="btn-container">
        <input type="submit" value="提交"/>
      </div>
    </form>
  )
}