import React, { useState } from 'react';
import Results from './Results';

export default function AuditForm() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);
    const file = e.target.file.files[0];
    const formData = new FormData();
    if (file) formData.append('file', file);

    try {
      setLoading(true);
      const resp = await fetch('http://127.0.0.1:5000/audit', {
        method: 'POST',
        body: formData,
      });
      if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
      const data = await resp.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="audit-form">
        <div className="file-input-container">
          <label htmlFor="file-input" style={{ fontWeight: '600', color: '#333' }}>
            Select CSV File:
          </label>
          <input 
            id="file-input"
            type="file" 
            name="file" 
            accept=".csv" 
            className="file-input"
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Running Audit...' : 'Run Audit'}
        </button>
      </form>

      {loading && <div className="loading">Running audit — this may take a moment...</div>}
      {error && <div className="error">{error}</div>}
      {results && <Results results={results} />}
    </div>
  );
}