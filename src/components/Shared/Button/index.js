import { forwardRef } from 'react';

const Button = forwardRef(({ label, className, handleOnClick, disableBtn = null }, btnRef) => (
  <>
    <button className={className} onClick={handleOnClick} disabled={disableBtn} ref={btnRef}>
      {label}
    </button>
  </>
));

export default Button;

