import { useState, useId } from "react";
import "./InputPassword.css";
import Eye from "../../assets/visibility.svg";
import EyeOff from "../../assets/visibility_off.svg";

export default function PasswordInput({
  text_label,
  value,
  onChange,
  placeholder,
}) {
  const id = useId();
  const [mostrar, setMostrar] = useState(false);

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <div className="input_label">
      <label htmlFor={id} className="label">{text_label}</label>
      <div className="input-wrapper">
        <input
          id={id}
          type={mostrar ? "text" : "password"}
          className="input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="on"
        />
        <img
          src={mostrar ? EyeOff : Eye}
          alt={mostrar ? "Ocultar senha" : "Mostrar senha"}
          className="icon-eye"
          onClick={() => setMostrar(!mostrar)}
        />
      </div>
    </div>
  );
}
