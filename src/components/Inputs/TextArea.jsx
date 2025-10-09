import "./TextArea.css";

export default function TextArea({
  label = "Descrição",
  placeholder = "Digite aqui...",
  value,
  onChange,
  maxLength = 300,
  showCount = true,
}) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}

      <textarea
        className="textarea-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />

      {showCount && (
        <span className="textarea-count">
          {value?.length || 0}/{maxLength}
        </span>
      )}
    </div>
  );
}
