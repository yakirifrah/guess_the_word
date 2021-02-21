import { forwardRef } from 'react';
import './style.scss';

const Input = forwardRef(
  (
    { type, style, handleChange = null, index = null, name, maxLength = null, label = null, placeholder = null },
    ref,
  ) => {
    return (
      <>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          className={`Input ${style} u-mr-4`}
          type={type}
          maxLength={maxLength}
          onChange={handleChange ? (e) => handleChange(e, index) : null}
          ref={ref}
          placeholder={placeholder}
          name={name}
        />
      </>
    );
  },
);
export default Input;
