import "./Button.css";
import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <div>
      <Link to={props.to} className="button">
        {props.text}
      </Link>
    </div>
  );
}
