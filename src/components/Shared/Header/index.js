import './style.scss';

export default function Header({ title, size }) {
  return (
    <div className="Header">
      <h1 className={`Header__${size}`}>{title}</h1>
    </div>
  );
}
