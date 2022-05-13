import { Link } from 'react-router-dom';

const Button = (props) => {
  // felles klasser for button og link
  const classes = `bg-gradient-left text-white text-center font-bold py-2 px-4 rounded w-full ${
    props.className || ''
  }`;

  // Rendrer button element hvis type prop er satt til button eller submit // <Button type="button">Tekst</Button>
  if (props.type === 'button' || props.type === 'submit')
    return (
      <button className={classes} type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );

  // Rendrer en link som standard hvis man ikke setter type prop til button eller submit //
  return (
    <Link to={props.to} className={classes}>
      {props.children}
    </Link>
  );
};
export default Button;
