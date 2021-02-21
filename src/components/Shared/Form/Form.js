import './style.scss';
const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="Form">
      {props.children}
    </form>
  );
};
export default Form;
