import "./TextArea.css";

export default function TextArea({
  text_label,
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
      {text_label && <label className="textarea-label">{text_label}</label>}

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
