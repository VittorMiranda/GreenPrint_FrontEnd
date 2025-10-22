import { useState } from "react";
import "./InputFile.css";

export default function ImageUpload({ label = "Envie até 3 imagens", onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // limite de 3 imagens

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Full = reader.result; // data:image/...;base64,xxxx
          const base64 = base64Full.split(",")[1];
          resolve({
            nome: file.name,
            tipo: file.type,
            base64,
            preview: base64Full, // pra exibir
            blob: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((imagens) => {
      setPreviews(imagens.map((img) => img.preview));

      if (onChange) onChange(imagens); // envia lista completa para o pai
    });
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
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
