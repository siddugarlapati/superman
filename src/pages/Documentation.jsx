import React, { useState } from 'react';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'quantum', title: 'Quantum Algorithms', icon: '⚛️' },
    { id: 'encryption', title: 'Homomorphic Encryption', icon: '🔒' },
    { id: 'certificates', title: 'Fairness Certificates', icon: '🏆' },
    { id: 'api', title: 'API Reference', icon: '🔌' },
    { id: 'integration', title: 'Integration Guide', icon: '🔧' },
    { id: 'security', title: 'Security Model', icon: '🛡️' },
    { id: 'faq', title: 'FAQ', icon: '❓' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="doc-content">
            <h2>Quantum-Enhanced AI Auditor Overview</h2>
            <p className="lead">
              The Quantum-Enhanced AI Auditor is a revolutionary platform that combines quantum computing, 
              homomorphic encryption, and advanced machine learning to provide provable fairness auditing 
              for AI models at scale.
            </p>

            <h3>Key Features</h3>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h4>Quantum Speed</h4>
                  <p>Exponentially faster bias detection using quantum algorithms for large-scale model analysis</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-text">
                  <h4>Privacy-Preserving</h4>
                  <p>Homomorphic encryption ensures your models remain private throughout the audit process</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <div className="feature-text">
                  <h4>Provable Certificates</h4>
                  <p>Cryptographically signed fairness certificates with public verification</p>
                </div>
              </div>
            </div>

            <h3>How It Works</h3>
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Secure Upload</h4>
                  <p>Your AI model is encrypted client-side using homomorphic encryption before upload</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Quantum Analysis</h4>
                  <p>Our quantum algorithms analyze the encrypted model for bias and fairness violations</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Certificate Generation</h4>
                  <p>A cryptographically signed certificate is generated with the audit results</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quantum':
        return (
          <div className="doc-content">
            <h2>Quantum Algorithms</h2>
            <p className="lead">
              Our quantum-enhanced auditing leverages advanced quantum algorithms to achieve 
              exponential speedups in bias detection and fairness analysis.
            </p>

            <h3>Quantum Anomaly Detection</h3>
            <div className="algorithm-section">
              <p>
                We employ a novel quantum anomaly detection algorithm based on quantum support vector machines (QSVM) 
                that can identify bias patterns in high-dimensional feature spaces exponentially faster than classical methods.
              </p>
              <div className="code-block">
                <pre><code>{`// Quantum Anomaly Detection Pseudocode
quantum_circuit = create_quantum_circuit(n_qubits)
for feature in model_features:
    quantum_circuit.add_rotation_gate(feature.angle)
    quantum_circuit.add_entanglement_gate()

bias_amplitude = quantum_circuit.measure_bias_operator()
fairness_score = calculate_fairness(bias_amplitude)`}</code></pre>
              </div>
            </div>

            <h3>Quantum Superposition Analysis</h3>
            <p>
              By leveraging quantum superposition, we can simultaneously analyze all possible 
              demographic combinations, providing comprehensive bias detection in a single quantum operation.
            </p>

            <h3>Performance Benefits</h3>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Analysis Type</th>
                    <th>Classical Time</th>
                    <th>Quantum Time</th>
                    <th>Speedup</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bias Detection</td>
                    <td>O(n²)</td>
                    <td>O(log n)</td>
                    <td>Exponential</td>
                  </tr>
                  <tr>
                    <td>Fairness Metrics</td>
                    <td>O(n³)</td>
                    <td>O(√n)</td>
                    <td>Polynomial</td>
                  </tr>
                  <tr>
                    <td>Adversarial Detection</td>
                    <td>O(2ⁿ)</td>
                    <td>O(n)</td>
                    <td>Exponential</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'encryption':
        return (
          <div className="doc-content">
            <h2>Homomorphic Encryption</h2>
            <p className="lead">
              Our platform uses advanced homomorphic encryption to ensure your AI models 
              remain completely private during the auditing process.
            </p>

            <h3>Encryption Scheme</h3>
            <p>
              We implement a fully homomorphic encryption (FHE) scheme based on the CKKS protocol, 
              optimized for machine learning operations on encrypted data.
            </p>

            <div className="encryption-flow">
              <div className="flow-step">
                <h4>1. Key Generation</h4>
                <p>Client generates public/private key pair locally</p>
                <div className="code-snippet">
                  <code>keys = generate_ckks_keys(security_level=128)</code>
                </div>
              </div>
              <div className="flow-step">
                <h4>2. Model Encryption</h4>
                <p>AI model parameters are encrypted before transmission</p>
                <div className="code-snippet">
                  <code>encrypted_model = encrypt(model_params, public_key)</code>
                </div>
              </div>
              <div className="flow-step">
                <h4>3. Homomorphic Operations</h4>
                <p>Audit computations performed on encrypted data</p>
                <div className="code-snippet">
                  <code>encrypted_result = audit_function(encrypted_model)</code>
                </div>
              </div>
            </div>

            <h3>Security Guarantees</h3>
            <ul className="security-list">
              <li>🔒 <strong>Semantic Security:</strong> Encrypted models are computationally indistinguishable from random</li>
              <li>🛡️ <strong>Zero-Knowledge:</strong> Auditors learn nothing about your model beyond the audit result</li>
              <li>🔐 <strong>Post-Quantum Security:</strong> Resistant to attacks from quantum computers</li>
              <li>⚡ <strong>Efficient Operations:</strong> Optimized for machine learning workloads</li>
            </ul>
          </div>
        );

      case 'certificates':
        return (
          <div className="doc-content">
            <h2>Fairness Certificates</h2>
            <p className="lead">
              Our cryptographically signed certificates provide verifiable proof of AI fairness 
              that can be independently validated by third parties.
            </p>

            <h3>Certificate Structure</h3>
            <div className="certificate-structure">
              <div className="structure-item">
                <h4>Header</h4>
                <ul>
                  <li>Certificate ID</li>
                  <li>Issue timestamp</li>
                  <li>Expiration date</li>
                  <li>Issuer signature</li>
                </ul>
              </div>
              <div className="structure-item">
                <h4>Model Information</h4>
                <ul>
                  <li>Model hash</li>
                  <li>Organization</li>
                  <li>Model type</li>
                  <li>Dataset fingerprint</li>
                </ul>
              </div>
              <div className="structure-item">
                <h4>Audit Results</h4>
                <ul>
                  <li>Fairness score</li>
                  <li>Bias metrics</li>
                  <li>Demographic analysis</li>
                  <li>Adversarial robustness</li>
                </ul>
              </div>
            </div>

            <h3>Digital Signature</h3>
            <p>
              Each certificate is signed using a quantum-resistant digital signature scheme 
              based on lattice cryptography, ensuring long-term security.
            </p>

            <div className="signature-example">
              <h4>Example Certificate Signature</h4>
              <div className="code-block">
                <pre><code>{`BEGIN QUANTUM SIGNATURE
Version: QKD-1.0
Algorithm: CRYSTALS-Dilithium
Hash: SHA-3-256
Signature: 0x4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d...
Timestamp: 2024-01-15T14:30:00Z
END QUANTUM SIGNATURE`}</code></pre>
              </div>
            </div>

            <h3>Verification Process</h3>
            <ol className="verification-steps">
              <li>Extract certificate hash from document</li>
              <li>Query public certificate repository</li>
              <li>Verify digital signature using public key</li>
              <li>Check certificate validity and expiration</li>
              <li>Confirm audit results integrity</li>
            </ol>
          </div>
        );

      case 'api':
        return (
          <div className="doc-content">
            <h2>API Reference</h2>
            <p className="lead">
              Complete API documentation for integrating with the Quantum-Enhanced AI Auditor.
            </p>

            <h3>Base URL</h3>
            <div className="code-block">
              <code>https://api.quantum-auditor.com/v1</code>
            </div>

            <h3>Authentication</h3>
            <p>All API requests require authentication using API keys:</p>
            <div className="code-block">
              <pre><code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.quantum-auditor.com/v1/audit`}</code></pre>
            </div>

            <h3>Endpoints</h3>
            <div className="endpoint-list">
              <div className="endpoint">
                <div className="endpoint-header">
                  <span className="method post">POST</span>
                  <span className="path">/audit</span>
                </div>
                <p>Submit a model for fairness auditing</p>
                <div className="endpoint-details">
                  <h4>Request Body</h4>
                  <div className="code-block">
                    <pre><code>{`{
  "model_file": "base64_encoded_model",
  "dataset_file": "base64_encoded_dataset",
  "audit_options": {
    "bias_types": ["gender", "age", "race"],
    "encryption_method": "homomorphic",
    "priority": "quantum"
  }
}`}</code></pre>
                  </div>
                  <h4>Response</h4>
                  <div className="code-block">
                    <pre><code>{`{
  "audit_id": "audit_12345",
  "status": "processing",
  "estimated_completion": "2024-01-15T14:35:00Z"
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="endpoint">
                <div className="endpoint-header">
                  <span className="method get">GET</span>
                  <span className="path">/audit/&#123;id&#125;</span>
                </div>
                <p>Get audit results</p>
                <div className="endpoint-details">
                  <h4>Response</h4>
                  <div className="code-block">
                    <pre><code>{`{
  "audit_id": "audit_12345",
  "status": "completed",
  "results": {
    "fairness_score": 0.73,
    "bias_metrics": {...},
    "certificate_url": "https://certs.quantum-auditor.com/cert_001"
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="endpoint">
                <div className="endpoint-header">
                  <span className="method get">GET</span>
                  <span className="path">/certificates/&#123;id&#125;</span>
                </div>
                <p>Retrieve certificate details</p>
              </div>

              <div className="endpoint">
                <div className="endpoint-header">
                  <span className="method post">POST</span>
                  <span className="path">/verify</span>
                </div>
                <p>Verify certificate authenticity</p>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="doc-content">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-list">
              <div className="faq-item">
                <h3>How does quantum computing improve AI auditing?</h3>
                <p>
                  Quantum algorithms can explore exponentially large solution spaces simultaneously, 
                  allowing us to detect bias patterns that would be computationally infeasible 
                  with classical methods. This enables comprehensive fairness analysis in minutes 
                  rather than hours or days.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is my AI model data secure during auditing?</h3>
                <p>
                  Yes, absolutely. We use homomorphic encryption to ensure your model remains 
                  encrypted throughout the entire auditing process. Our auditors never see your 
                  raw model data, only the encrypted version, yet can still perform comprehensive 
                  fairness analysis.
                </p>
              </div>

              <div className="faq-item">
                <h3>How can I verify the authenticity of a certificate?</h3>
                <p>
                  Each certificate includes a unique cryptographic hash that can be verified 
                  through our public certificate repository. Simply enter the hash in our 
                  verification tool to confirm the certificate's authenticity and validity.
                </p>
              </div>

              <div className="faq-item">
                <h3>What types of bias can the system detect?</h3>
                <p>
                  Our system can detect various forms of bias including demographic bias 
                  (gender, age, race), socioeconomic bias, geographic bias, and intersectional 
                  bias across multiple protected attributes simultaneously.
                </p>
              </div>

              <div className="faq-item">
                <h3>How long does an audit take?</h3>
                <p>
                  Thanks to our quantum acceleration, most audits complete within 2-5 minutes 
                  for standard models. Complex models or comprehensive audits may take up to 
                  15 minutes, which is still orders of magnitude faster than traditional methods.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I integrate this into my CI/CD pipeline?</h3>
                <p>
                  Yes! We provide REST APIs and SDKs for popular programming languages. 
                  You can easily integrate fairness auditing into your model deployment 
                  pipeline to ensure only fair models reach production.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="documentation-page">
      <div className="doc-layout">
        <div className="doc-sidebar">
          <div className="sidebar-header">
            <h2>Documentation</h2>
          </div>
          <nav className="doc-nav">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-title">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="doc-main">
          <div className="doc-container">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}