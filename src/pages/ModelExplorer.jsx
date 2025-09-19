import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api';

export default function ModelExplorer() {
  const [filters, setFilters] = useState({
    dataset: 'all',
    organization: 'all',
    auditType: 'all',
    severity: 'all'
  });

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await ApiService.getModels(filters);
        setModels(data);
      } catch (error) {
        console.error('Failed to load models:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, [filters]);

  const getResultBadge = (result) => {
    const classes = {
      pass: 'result-pass',
      warn: 'result-warn',
      fail: 'result-fail'
    };
    return classes[result] || '';
  };

  const getBiasScoreClass = (score) => {
    if (score <= 0.3) return 'bias-low';
    if (score <= 0.6) return 'bias-medium';
    return 'bias-high';
  };

  if (loading) {
    return (
      <div className="model-explorer-page">
        <div className="loading">Loading models...</div>
      </div>
    );
  }

  return (
    <div className="model-explorer-page">
      <div className="page-header">
        <h1>Model Explorer</h1>
        <p>Browse and filter audit results across all models</p>
      </div>

      <div className="explorer-controls">
        <div className="filters-section">
          <div className="filter-group">
            <label>Dataset</label>
            <select 
              value={filters.dataset}
              onChange={(e) => setFilters(prev => ({...prev, dataset: e.target.value}))}
              className="filter-select"
            >
              <option value="all">All Datasets</option>
              <option value="recruitment">Recruitment</option>
              <option value="financial">Financial</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Organization</label>
            <select 
              value={filters.organization}
              onChange={(e) => setFilters(prev => ({...prev, organization: e.target.value}))}
              className="filter-select"
            >
              <option value="all">All Organizations</option>
              <option value="TechCorp">TechCorp</option>
              <option value="FinanceInc">FinanceInc</option>
              <option value="StartupXYZ">StartupXYZ</option>
              <option value="BankABC">BankABC</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Result</label>
            <select 
              value={filters.severity}
              onChange={(e) => setFilters(prev => ({...prev, severity: e.target.value}))}
              className="filter-select"
            >
              <option value="all">All Results</option>
              <option value="pass">Pass</option>
              <option value="warn">Warning</option>
              <option value="fail">Fail</option>
            </select>
          </div>

          <div className="search-group">
            <input 
              type="text" 
              placeholder="Search models..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="view-controls">
          <button className="view-btn active">Grid View</button>
          <button className="view-btn">List View</button>
        </div>
      </div>

      <div className="models-grid">
        {models.map(model => (
          <div key={model.id} className="model-card-explorer">
            <div className="model-header">
              <h3 className="model-title">{model.name}</h3>
              <span className={`result-badge ${getResultBadge(model.result)}`}>
                {model.result.toUpperCase()}
              </span>
            </div>

            <div className="model-details">
              <div className="detail-item">
                <span className="detail-label">Organization:</span>
                <span className="detail-value">{model.org}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dataset:</span>
                <span className="detail-value">{model.dataset}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bias Score:</span>
                <span className={`detail-value ${getBiasScoreClass(model.biasScore)}`}>
                  {(model.biasScore * 100).toFixed(1)}%
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Certificate:</span>
                <span className="detail-value certificate-link">{model.certificate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Audited:</span>
                <span className="detail-value">{model.timestamp}</span>
              </div>
            </div>

            <div className="model-actions">
              <Link to={`/detail/${model.id}`} className="action-btn-primary">View Details</Link>
              <button className="action-btn-secondary">Re-run Audit</button>
              <button className="action-btn-secondary">Download Report</button>
              <button className="action-btn-warning">Challenge</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-info">Showing {models.length} models</span>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
}