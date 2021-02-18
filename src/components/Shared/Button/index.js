import { forwardRef } from 'react';
import './style.scss';

const Button = forwardRef(({ label, className, handleOnClick }, btnRef) => (
  <>
    <button className={className} onClick={handleOnClick} ref={btnRef}>
      {label}
    </button>
  </>
));

export default Button;
