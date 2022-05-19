import { Link } from 'react-router-dom';

const Button = (props) => {
  // classes for button and link
  const classes = `bg-gradient-left text-white text-center font-bold py-2 px-4 rounded w-full whitespace-nowrap hover:bg-purple-2 ${
    props.className || ''
  }`;

  // return link element if props to is being used
  if (props.to)
    return (
      <Link to={props.to} className={classes}>
        {props.children}
      </Link>
    );

  // return regular button element if props to is not being used.
  return (
    <button className={classes} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;
