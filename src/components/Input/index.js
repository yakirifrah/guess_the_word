import { forwardRef, useState } from 'react';
import './style.scss';

const Input = forwardRef(({ type, style, handleChange, index = null }, ref) => {
  return (
    <input
      className={`Input ${style} u-mr-4`}
      type={type}
      maxLength="1"
      onChange={(e) => handleChange(e, index)}
      ref={ref}
    />
  );
});
export default Input;
