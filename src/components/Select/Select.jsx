import "./Select.css";

export default function Select({ label, options = [], value, onChange }) {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Selecione...</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
