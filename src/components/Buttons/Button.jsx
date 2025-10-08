import "./Button.css";

export default function Button(props) {
  return (
    <div>
      <button className="button">{props.text}</button>
    </div>
  );
}
