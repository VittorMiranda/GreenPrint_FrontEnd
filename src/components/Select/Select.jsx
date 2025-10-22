import "./Select.css";

export default function Select({ label, options = [], value = "", onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select className="select-input" value={value} onChange={handleChange}>
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
