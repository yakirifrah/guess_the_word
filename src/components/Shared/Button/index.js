import { forwardRef } from 'react';
import './style.scss';

const Button = forwardRef(({ label, className, handleOnClick }, btnRef) => (
  <div className="Button">
    <button className={className + ' btn'} onClick={handleOnClick} ref={btnRef}>
      {label}
    </button>
  </div>
));

export default Button;
