import { Link } from 'react-router-dom';

const Button = ({ to, className, onClick, type, children }) => {
  // Reusable button component

  // classes for button and link
  const classes = `bg-gradient-left text-white text-center font-bold py-2 px-4 rounded w-full whitespace-nowrap hover:bg-purple-2 ${
    className || ''
  }`;

  // return link element if the to prop is being used
  if (to)
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );

  // return regular button element if the to prop is not being used.
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
