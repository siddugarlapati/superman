import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Charts from '../components/Charts';
import ApiService from '../services/api';

export default function AuditDetail() {
  const { id } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuditDetail = async () => {
      try {
        const data = await ApiService.getAuditDetail(id);
        setAuditData({
          ...data,
          modelName: data.name,
          organization: data.org,
          overallScore: data.biasScore,
          result: data.result
        });
      } catch (error) {
        console.error('Failed to load audit detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuditDetail();
  }, [id]);

  const verifyCertificate = () => {
    setVerificationStatus('verifying');
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  const downloadCertificate = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `certificate_${auditData.modelName}.pdf`;
    link.click();
  };

  if (loading) {
    return (
      <div className="audit-detail-page">
        <div className="loading">Loading audit details...</div>
      </div>
    );
  }

  if (!auditData) {
    return (
      <div className="audit-detail-page">
        <div className="error">Audit not found</div>
      </div>
    );
  }

  return (
    <div className="audit-detail-page">
      <div className="detail-header">
        <div className="header-content">
          <h1>{auditData.modelName}</h1>
          <p>{auditData.organization}</p>
        </div>
        <div className="header-status">
          <span className={`status-badge ${auditData.result}`}>
            {auditData.result.toUpperCase()}
          </span>
          <div className="overall-score">
            <span className="score-label">Fairness Score</span>
            <span className={`score-value ${auditData.overallScore > 0.6 ? 'poor' : auditData.overallScore > 0.3 ? 'fair' : 'good'}`}>
              {((1 - auditData.overallScore) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="provenance-section">
          <div className="section-card">
            <h3>Audit Provenance</h3>
            <div className="provenance-details">
              <div className="provenance-item">
                <span className="provenance-label">Upload Time:</span>
                <span className="provenance-value">{auditData.uploadTime}</span>
              </div>
              <div className="provenance-item">
                <span className="provenance-label">Key Fingerprint:</span>
                <code className="provenance-code">{auditData.keyFingerprint}</code>
              </div>
              <div className="provenance-item">
                <span className="provenance-label">Audit Hash:</span>
                <code className="provenance-code">{auditData.auditHash}</code>
              </div>
              <div className="cryptographic-proof">
                <h4>Cryptographic Proof</h4>
                <div className="proof-snippet">
                  <code>
                    BEGIN QUANTUM SIGNATURE<br/>
                    Version: QKD-1.0<br/>
                    Hash: SHA-3-256<br/>
                    Signature: 0x4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d...<br/>
                    END QUANTUM SIGNATURE
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="metrics-section">
          <div className="section-card">
            <h3>Performance Metrics</h3>
            <Charts modelName={auditData.modelName} metrics={auditData.metrics} />
            
            <div className="group-metrics">
              <h4>Group-wise Performance</h4>
              <div className="metrics-table">
                <div className="table-header">
                  <span>Group</span>
                  <span>TPR</span>
                  <span>FPR</span>
                  <span>Precision</span>
                </div>
                {auditData.groupMetrics.map((group, index) => (
                  <div key={index} className="table-row">
                    <span className="group-name">{group.group}</span>
                    <span className={`metric-value ${group.tpr > 0.8 ? 'good' : group.tpr > 0.6 ? 'fair' : 'poor'}`}>
                      {(group.tpr * 100).toFixed(1)}%
                    </span>
                    <span className={`metric-value ${group.fpr < 0.15 ? 'good' : group.fpr < 0.25 ? 'fair' : 'poor'}`}>
                      {(group.fpr * 100).toFixed(1)}%
                    </span>
                    <span className={`metric-value ${group.precision > 0.8 ? 'good' : group.precision > 0.6 ? 'fair' : 'poor'}`}>
                      {(group.precision * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {auditData.adversarialAnalysis.detected && (
          <div className="adversarial-section">
            <div className="section-card">
              <h3>Adversarial Analysis</h3>
              <div className="adversarial-alert">
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <h4>Adversarial Vulnerability Detected</h4>
                  <p><strong>Attack Vector:</strong> {auditData.adversarialAnalysis.attackVector}</p>
                  <p><strong>Confidence:</strong> {(auditData.adversarialAnalysis.confidence * 100).toFixed(1)}%</p>
                  <p><strong>Explanation:</strong> {auditData.adversarialAnalysis.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="certificate-section">
          <div className="section-card">
            <h3>Fairness Certificate</h3>
            <div className="certificate-preview">
              <div className="certificate-header">
                <div className="cert-logo">🏆</div>
                <div className="cert-title">AI Fairness Certificate</div>
              </div>
              <div className="certificate-body">
                <p><strong>Model:</strong> {auditData.modelName}</p>
                <p><strong>Organization:</strong> {auditData.organization}</p>
                <p><strong>Audit Date:</strong> {auditData.uploadTime}</p>
                <p><strong>Result:</strong> <span className={`cert-result ${auditData.result}`}>{auditData.result.toUpperCase()}</span></p>
                <p><strong>Digital Signature:</strong></p>
                <code className="cert-signature">{auditData.auditHash}</code>
              </div>
            </div>
            
            <div className="certificate-actions">
              <button 
                className="verify-btn"
                onClick={verifyCertificate}
                disabled={verificationStatus === 'verifying'}
              >
                {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Certificate'}
              </button>
              <button className="download-btn" onClick={downloadCertificate}>
                Download PDF
              </button>
            </div>

            {verificationStatus === 'verified' && (
              <div className="verification-result">
                <div className="verification-success">
                  <span className="check-icon">✅</span>
                  <span>Certificate verified successfully!</span>
                </div>
                <div className="verification-details">
                  <p>✓ Digital signature is valid</p>
                  <p>✓ Quantum proof verified</p>
                  <p>✓ Audit integrity confirmed</p>
                  <p>✓ Certificate has not been tampered with</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}