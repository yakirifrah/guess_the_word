// import { forwardRef } from 'react';
import './style.scss';

const Input = ({ type, style, handleChange, index = null ,value}) => {
  return (
    <input
      className={`Input ${style} u-mr-4`}
      type={type}
      maxLength="1"
      onChange={(e) => handleChange(e, index)}
      value={value}
    />
  );
}
export default Input;
