import * as React from 'react';
import './style.css';

export interface FormType {
  name: string;
  gender: string;
  group: string;
  qq: string;
  phone: string;
  student_id: string;
  intro: string;
  reset: number;
  [propName: string]: string | number | undefined;
}

interface PropType {
  value: FormType;
  onChange: (event:
    React.ChangeEvent<HTMLSelectElement> |
    React.ChangeEvent<HTMLInputElement> |
    React.MouseEvent<HTMLInputElement, MouseEvent> |
    React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinusForm: React.FC<PropType> = props => {

  const { name, gender, group, qq, phone, student_id, intro } = props.value;
  const { onChange: handleChange, onSubmit: handleSubmit } = props;

  const isMale = (gender === '男') ? true : false;

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="name">姓名</label>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="gender">性别</label>
        </div>
        <span style={{ display: 'inline-block' }}>
          <span className="radio-container">
            <label htmlFor="male" style={{ color: isMale ? null : '#9F9F9F' }}>男</label>
            <input type="radio" name="gender" id="male" value="男" defaultChecked onClick={handleChange} />
          </span>
          <span className="radio-container">
            <label htmlFor="female" style={{ color: isMale ? '#9F9F9F' : null }}>女</label>
            <input type="radio" name="gender" id="female" value="女" onClick={handleChange} />
          </span>
          <span className="gender-underline" style={{
            transform: !isMale ? 'translateX(78px)' : 'translateX(5px)',
            background: !isMale ? '#FF7272' : '#72ADFF'
          }}
          />
        </span>
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="group">组别</label>
        </div>
        <select name="group" id="group" value={group} onChange={handleChange}>
          <option value="行政组">行政组</option>
          <option value="运营组">运营组</option>
          <option value="产品组">产品组</option>
          <option value="设计组">设计组</option>
          <option value="研发组">研发组</option>
        </select>
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="qq">QQ</label>
        </div>
        <input
          type="text"
          name="qq"
          id="qq"
          value={qq}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="phone">手机</label>
        </div>
        <input
          type="tel"
          pattern="^[1]([3-9])[0-9]{9}$"
          name="phone" id="phone"
          value={phone}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="clazz">学号</label>
        </div>
        <input
          type="text"
          name="student_id"
          id="student_id"
          value={student_id}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="joinus-form-row">
        <div className="joinus-label-container">
          <label htmlFor="introduction">自我介绍</label>
        </div>
      </div>
      <textarea
        name="intro"
        id="introduction"
        placeholder="包括但不限于你的爱好、特长、经历与想法。丰富的自我介绍，能使我们更快更好地了解你，在笔面试前就吸引我们的注意喔~"
        value={intro}
        onChange={handleChange}
        required={true}
      />
      <div className="btn-container">
        <input type="submit" value="提交" />
      </div>
    </form>
  );
};

export default JoinusForm;
