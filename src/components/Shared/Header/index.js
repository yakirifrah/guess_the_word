import { memo } from 'react';
import './style.scss';

const Header = ({ title, size }) => {
  return (
    <div className="Header">
      <h1 className={`Header__${size}`}>{title}</h1>
    </div>
  );
};
export default memo(Header, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title;
});
