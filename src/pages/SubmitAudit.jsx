import React, { useState } from 'react';
import AuditForm from '../components/AuditForm';

export default function SubmitAudit() {
  const [dragActive, setDragActive] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [auditOptions, setAuditOptions] = useState({
    biasTypes: ['gender', 'age', 'race'],
    demographicGroups: ['all'],
    encryptionMethod: 'homomorphic',
    priority: 'quantum'
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate encryption progress
      setEncryptionProgress(0);
      const interval = setInterval(() => {
        setEncryptionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowPreview(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const loadSampleDataset = () => {
    setShowPreview(true);
    setEncryptionProgress(100);
  };

  return (
    <div className="submit-audit-page">
      <div className="page-header">
        <h1>Submit Audit</h1>
        <p>Upload models for quantum-enhanced fairness auditing</p>
      </div>

      <div className="audit-grid">
        <div className="upload-section">
          <div className="section-header">
            <h3>Upload Models</h3>
            <p>Drag & drop or select files for batch auditing</p>
          </div>

          <div 
            className={`drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="drop-zone-content">
              <div className="drop-icon">📁</div>
              <h4>Drop your models here</h4>
              <p>Supports CSV, JSON, PKL formats</p>
              <button className="upload-btn">Choose Files</button>
              <button className="sample-btn" onClick={loadSampleDataset}>
                Load Sample Dataset
              </button>
            </div>
          </div>

          {encryptionProgress > 0 && encryptionProgress < 100 && (
            <div className="encryption-progress">
              <div className="progress-header">
                <span>🔒 Client-side Encryption</span>
                <span>{encryptionProgress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${encryptionProgress}%` }}
                ></div>
              </div>
              <p>Your data is being encrypted before upload...</p>
            </div>
          )}

          {encryptionProgress === 100 && (
            <div className="encryption-complete">
              <div className="security-info">
                <div className="security-item">
                  <span className="security-icon">🔑</span>
                  <div>
                    <strong>Key Fingerprint:</strong>
                    <code>SHA256:a1b2c3d4e5f6...</code>
                  </div>
                </div>
                <div className="security-item">
                  <span className="security-icon">🛡️</span>
                  <div>
                    <strong>Encryption Hash:</strong>
                    <code>0x7f8e9d0c1b2a...</code>
                  </div>
                </div>
                <button className="export-key-btn">Export Key</button>
              </div>
            </div>
          )}
        </div>

        <div className="options-section">
          <div className="section-header">
            <h3>Audit Options</h3>
            <p>Configure your audit parameters</p>
          </div>

          <div className="options-form">
            <div className="option-group">
              <label>Bias Types to Test</label>
              <div className="checkbox-group">
                {['gender', 'age', 'race', 'income', 'education'].map(type => (
                  <label key={type} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={auditOptions.biasTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAuditOptions(prev => ({
                            ...prev,
                            biasTypes: [...prev.biasTypes, type]
                          }));
                        } else {
                          setAuditOptions(prev => ({
                            ...prev,
                            biasTypes: prev.biasTypes.filter(t => t !== type)
                          }));
                        }
                      }}
                    />
                    <span className="checkbox-text">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Encryption Method</label>
              <select 
                value={auditOptions.encryptionMethod}
                onChange={(e) => setAuditOptions(prev => ({
                  ...prev,
                  encryptionMethod: e.target.value
                }))}
                className="select-input"
              >
                <option value="homomorphic">Homomorphic Encryption</option>
                <option value="secure-enclave">Secure Enclave</option>
                <option value="federated">Federated Learning</option>
              </select>
            </div>

            <div className="option-group">
              <label>Processing Priority</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="priority"
                    value="quantum"
                    checked={auditOptions.priority === 'quantum'}
                    onChange={(e) => setAuditOptions(prev => ({
                      ...prev,
                      priority: e.target.value
                    }))}
                  />
                  <span>Quantum Accelerated</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="priority"
                    value="classical"
                    checked={auditOptions.priority === 'classical'}
                    onChange={(e) => setAuditOptions(prev => ({
                      ...prev,
                      priority: e.target.value
                    }))}
                  />
                  <span>Classical Fallback</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="preview-section">
          <div className="section-header">
            <h3>Preview Submission</h3>
            <p>Review what will be sent (encrypted)</p>
          </div>
          <div className="preview-modal">
            <div className="preview-content">
              <div className="preview-item">
                <strong>Files:</strong> recruitment_data.csv (encrypted)
              </div>
              <div className="preview-item">
                <strong>Bias Tests:</strong> {auditOptions.biasTypes.join(', ')}
              </div>
              <div className="preview-item">
                <strong>Encryption:</strong> {auditOptions.encryptionMethod}
              </div>
              <div className="preview-item">
                <strong>Priority:</strong> {auditOptions.priority}
              </div>
              <div className="preview-actions">
                <button className="cancel-btn" onClick={() => setShowPreview(false)}>
                  Cancel
                </button>
                <AuditForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}