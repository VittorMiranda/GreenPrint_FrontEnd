import { useState } from "react";
import "./InputFile.css";

export default function ImageUpload({ label = "Envie até 3 imagens", onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // limita a 3 imagens

    // gera pré-visualizações
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // envia para o componente pai
    if (onChange) {
      onChange(files);
    }
  };

  const removeImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="image-upload-container">
      {label && <label className="image-upload-label">{label}</label>}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="image-upload-input"
      />

      <div className="image-preview-container">
        {previews.map((src, index) => (
          <div key={index} className="image-preview">
            <img src={src} alt={`preview-${index}`} />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
