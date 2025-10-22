import "./Input.css";
import { useId } from "react";

export default function Input({ type = "text", text_label, value, onChange, placeholder }) {
  const id = useId(); // Gera um ID único e estável por instância

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value); // só envia o value
  };

  return (
    <div className="input_label">
      <label htmlFor={id} className="label">{text_label}</label>
      <input
        id={id}
        type={type}
        className="input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="on"
      />
    </div>
  );
}
