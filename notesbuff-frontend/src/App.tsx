import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Use a ref to trigger the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setAnalysis(""); // Clear previous results
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

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/notes/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setAnalysis(data);
    } catch (error) {
      setAnalysis("Error: Connection to backend failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>NotesBuff</h1>
      <p>Analyze your knowledge gaps by uploading your notes.</p>

      {/* --- Drag & Drop Box --- */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#646cff' : '#ccc'}`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? '#f0f0ff' : 'transparent',
          transition: 'all 0.2s ease',
          marginBottom: '1rem'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileSelect} 
          style={{ display: 'none' }} 
        />
        
        {file ? (
          <p>Selected: <strong>{file.name}</strong></p>
        ) : (
          <p>Drag and drop a file here, or <strong>click to browse</strong></p>
        )}
      </div>

      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
        style={{ width: '100%', padding: '10px', cursor: file ? 'pointer' : 'not-allowed' }}
      >
        {loading ? "Analyzing..." : "Analyze Notes"}
      </button>

      {/* --- Analysis Output --- */}
      {analysis && (
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>Results:</h3>
          <div style={{ background: '#222', color: '#fff', padding: '1rem', borderRadius: '8px' }}>
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;