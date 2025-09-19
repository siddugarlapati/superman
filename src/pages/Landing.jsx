import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Quantum-Safe Ethical AI Audits at Scale
          </h1>
          <p className="hero-subtitle">
            Revolutionary quantum-enhanced auditing with homomorphic encryption 
            for provable fairness certificates
          </p>
          <div className="hero-cta">
            <Link to="/audit" className="cta-primary">Upload Test Models</Link>
            <Link to="/dashboard" className="cta-secondary">View Demo Run</Link>
          </div>
        </div>
        <div className="hero-animation">
          <div className="quantum-diagram">
            <div className="diagram-step">
              <div className="step-icon">📁</div>
              <div className="step-label">Encrypted Upload</div>
            </div>
            <div className="diagram-arrow">→</div>
            <div className="diagram-step">
              <div className="step-icon quantum-pulse">⚛️</div>
              <div className="step-label">Quantum Auditor</div>
            </div>
            <div className="diagram-arrow">→</div>
            <div className="diagram-step">
              <div className="step-icon">🏆</div>
              <div className="step-label">Certificate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quantum Speed</h3>
            <p>Exponentially faster bias detection using quantum algorithms for large-scale model analysis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Encrypted Processing</h3>
            <p>Homomorphic encryption ensures your models remain private throughout the audit process</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Provable Certificates</h3>
            <p>Cryptographically signed fairness certificates with public verification</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Models Audited</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">&lt; 1ms</div>
            <div className="stat-label">Detection Latency</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Privacy Guaranteed</div>
          </div>
        </div>
      </div>
    </div>
  );
}