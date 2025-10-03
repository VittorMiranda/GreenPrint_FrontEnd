import "./Input.css";

export default function Input(props) {
  return (
    <div className="input_label">
        <label htmlFor="" className="label">Text</label>
        <input type={props.type} className="input" />
    </div>
  );
}
