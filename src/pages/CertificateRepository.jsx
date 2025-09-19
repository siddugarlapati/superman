import React, { useState, useEffect } from 'react';

export default function CertificateRepository() {
  const [certificates, setCertificates] = useState([]);
  const [verificationHash, setVerificationHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Load certificates
    setCertificates([
      {
        id: 'cert_001',
        modelName: 'HR-Classifier-v2.1',
        organization: 'TechCorp',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        status: 'valid',
        hash: '0x7f8e9d0c1b2a3e4f5g6h7i8j9k0l',
        result: 'fail',
        biasScore: 0.73
      },
      {
        id: 'cert_002',
        modelName: 'Loan-Approval-AI',
        organization: 'FinanceInc',
        issueDate: '2024-01-14',
        expiryDate: '2025-01-14',
        status: 'valid',
        hash: '0x8g9f0e1d2c3b4a5f6g7h8i9j0k1l',
        result: 'warn',
        biasScore: 0.42
      },
      {
        id: 'cert_003',
        modelName: 'Resume-Screener',
        organization: 'StartupXYZ',
        issueDate: '2024-01-13',
        expiryDate: '2025-01-13',
        status: 'valid',
        hash: '0x9h0g1f2e3d4c5b6a7f8g9h0i1j2k',
        result: 'pass',
        biasScore: 0.18
      },
      {
        id: 'cert_004',
        modelName: 'Old-Model-v1',
        organization: 'LegacyCorp',
        issueDate: '2023-06-15',
        expiryDate: '2024-06-15',
        status: 'expired',
        hash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4',
        result: 'pass',
        biasScore: 0.25
      },
      {
        id: 'cert_005',
        modelName: 'Revoked-Classifier',
        organization: 'BadActorInc',
        issueDate: '2024-01-10',
        expiryDate: '2025-01-10',
        status: 'revoked',
        hash: '0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5',
        result: 'fail',
        biasScore: 0.89
      }
    ]);
  }, []);

  const handleVerification = async () => {
    if (!verificationHash.trim()) return;
    
    setVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification process
    setTimeout(() => {
      const certificate = certificates.find(cert => 
        cert.hash.toLowerCase() === verificationHash.toLowerCase()
      );
      
      if (certificate) {
        setVerificationResult({
          found: true,
          certificate,
          valid: certificate.status === 'valid',
          message: certificate.status === 'valid' 
            ? 'Certificate is valid and verified' 
            : `Certificate is ${certificate.status}`
        });
      } else {
        setVerificationResult({
          found: false,
          valid: false,
          message: 'Certificate not found or invalid hash'
        });
      }
      setVerifying(false);
    }, 2000);
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const downloadCertificate = (certId) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `certificate_${certId}.pdf`;
    link.click();
  };

  return (
    <div className="certificate-repository-page">
      <div className="page-header">
        <h1>Certificate Repository</h1>
        <p>Public repository of AI fairness certificates with verification</p>
      </div>

      <div className="repository-grid">
        <div className="verification-section">
          <div className="section-card">
            <h3>Certificate Verifier</h3>
            <p>Verify the authenticity of any fairness certificate</p>
            
            <div className="verification-form">
              <div className="input-group">
                <label>Certificate Hash</label>
                <input
                  type="text"
                  placeholder="Enter certificate hash (0x...)"
                  value={verificationHash}
                  onChange={(e) => setVerificationHash(e.target.value)}
                  className="hash-input"
                />
              </div>
              
              <button 
                onClick={handleVerification}
                disabled={verifying || !verificationHash.trim()}
                className="verify-button"
              >
                {verifying ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </div>

            {verificationResult && (
              <div className={`verification-result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
                <div className="result-header">
                  <span className="result-icon">
                    {verificationResult.valid ? '✅' : '❌'}
                  </span>
                  <span className="result-message">{verificationResult.message}</span>
                </div>
                
                {verificationResult.found && (
                  <div className="certificate-details">
                    <div className="detail-row">
                      <span>Certificate ID:</span>
                      <span>{verificationResult.certificate.id}</span>
                    </div>
                    <div className="detail-row">
                      <span>Model:</span>
                      <span>{verificationResult.certificate.modelName}</span>
                    </div>
                    <div className="detail-row">
                      <span>Organization:</span>
                      <span>{verificationResult.certificate.organization}</span>
                    </div>
                    <div className="detail-row">
                      <span>Issue Date:</span>
                      <span>{verificationResult.certificate.issueDate}</span>
                    </div>
                    <div className="detail-row">
                      <span>Status:</span>
                      <span className={`status-badge ${verificationResult.certificate.status}`}>
                        {verificationResult.certificate.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="certificates-section">
          <div className="section-card">
            <div className="section-header">
              <h3>Public Certificates</h3>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="valid">Valid</option>
                  <option value="expired">Expired</option>
                  <option value="revoked">Revoked</option>
                </select>
              </div>
            </div>

            <div className="certificates-grid">
              {filteredCertificates.map(cert => (
                <div key={cert.id} className="certificate-card">
                  <div className="certificate-header">
                    <div className="cert-id">{cert.id}</div>
                    <div className={`cert-status ${cert.status}`}>
                      {cert.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="certificate-body">
                    <h4>{cert.modelName}</h4>
                    <p className="cert-org">{cert.organization}</p>
                    
                    <div className="cert-metrics">
                      <div className="metric">
                        <span className="metric-label">Result:</span>
                        <span className={`metric-value result-${cert.result}`}>
                          {cert.result.toUpperCase()}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Bias Score:</span>
                        <span className={`metric-value ${cert.biasScore > 0.5 ? 'high' : cert.biasScore > 0.3 ? 'medium' : 'low'}`}>
                          {(cert.biasScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="cert-dates">
                      <div className="date-item">
                        <span>Issued:</span>
                        <span>{cert.issueDate}</span>
                      </div>
                      <div className="date-item">
                        <span>Expires:</span>
                        <span>{cert.expiryDate}</span>
                      </div>
                    </div>
                    
                    <div className="cert-hash">
                      <span className="hash-label">Hash:</span>
                      <code className="hash-value">{cert.hash}</code>
                    </div>
                  </div>
                  
                  <div className="certificate-actions">
                    <button 
                      onClick={() => setVerificationHash(cert.hash)}
                      className="action-btn verify"
                    >
                      Verify
                    </button>
                    <button 
                      onClick={() => downloadCertificate(cert.id)}
                      className="action-btn download"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <div className="no-results">
                <p>No certificates found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="section-card">
          <h3>Repository Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{certificates.length}</div>
              <div className="stat-label">Total Certificates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{certificates.filter(c => c.status === 'valid').length}</div>
              <div className="stat-label">Valid Certificates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{certificates.filter(c => c.result === 'pass').length}</div>
              <div className="stat-label">Passed Audits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {((certificates.filter(c => c.result === 'pass').length / certificates.length) * 100).toFixed(1)}%
              </div>
              <div className="stat-label">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}