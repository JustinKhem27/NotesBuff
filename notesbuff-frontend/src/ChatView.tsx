import React, { useState } from 'react';
import './ChatView.css';
import DropZone from './DropZone';

interface FilesState {
  notes: File | null;
  courseContent: File | null;
}

const ChatView: React.FC = () => {
  const [files, setFiles] = useState<FilesState>({ notes: null, courseContent: null });
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileSelect = (id: string, file: File) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [id]: file
    }));
  };

  const handleProcessFiles = async () => {
    const { notes, courseContent } = files;
    if (!notes && !courseContent) return;
    
    setLoading(true);
    setError("");
    setAnalysis(null);

    const fileToUpload = notes || courseContent;
    const uploadEndpoint = notes ? "http://localhost:8080/notes/upload" : "http://localhost:8080/content/upload";

    if (fileToUpload) {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      try {
        console.log(`Uploading file to: ${uploadEndpoint}`);
        const response = await fetch(uploadEndpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const id = await response.text();
        console.log(`Received ID from upload: '${id}'`); // Log the received ID

        await handleAnalyze(id);

      } catch (err) {
        console.error("Error during file processing:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during upload.";
        setError(`Error: Could not process file. ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleAnalyze = async (id : string) => {
    if (!id || id.trim() === "") {
      setError("Error: Received an invalid ID from the upload process.");
      return;
    }
    const endpoint = `http://localhost:8080/analysis/notes/${id.trim()}`;
    setError("");

    try {
      console.log(`Fetching analysis from: ${endpoint}`); // Log the analysis endpoint
      const response = await fetch(endpoint, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Analysis request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Error during analysis fetch:", err); // Log the actual error
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Error: Connection to backend failed during analysis. ${errorMessage}`);
    }
  }

  return (
    <main className="chat-view">
      <div className="app-container">
        <div className="drop-zones-wrapper">
          <DropZone
            id="notes"
            title="Upload Notes"
            onFileSelect={handleFileSelect}
          />
          <DropZone
            id="courseContent"
            title="Upload Topic Content"
            onFileSelect={handleFileSelect}
          />
        </div>
        <button
          className="analyze-btn"
          onClick={handleProcessFiles}
          disabled={(!files.notes && !files.courseContent) || loading}
          >
          {loading ? "Processing..." : "Analyze"}
        </button>
        {error && <div className="error-message">{error}</div>}
        {analysis && (
          <div className="results-section">
            <h3>Results:</h3>
            <pre className="results-box">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatView;

