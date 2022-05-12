import { Link } from "react-router-dom";

const Button = (props) => {

    return (
            <Link to={props.to} className={`bg-gradient-left text-white text-center font-bold py-2 px-4 rounded max-w-sm ${props.className}`}>{props.children}</Link>
    )

};
export default Button;