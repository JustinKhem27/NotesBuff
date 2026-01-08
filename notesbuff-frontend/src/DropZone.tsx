import React, { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import './DropZone.css';

interface DropZoneProps {
  id: string;
  title: string;
  onFileSelect: (id: string, file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ id, title, onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    onFileSelect(id, selectedFile);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="drop-zone-container">
      <h3>{title}</h3>
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        {file ? (
          <p>Selected: <strong>{file.name}</strong></p>
        ) : (
          <p>Drag and drop a file here, or <strong>click to browse</strong></p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
