import React from 'react';
import Charts from './Charts';

const getMetricClass = (value, type) => {
  if (type === 'accuracy') {
    if (value >= 0.8) return 'good';
    if (value >= 0.6) return 'warning';
    return 'danger';
  }
  if (type === 'bias' || type === 'robustness') {
    if (value <= 0.1) return 'good';
    if (value <= 0.3) return 'warning';
    return 'danger';
  }
  return '';
};

export default function Results({ results }) {
  return (
    <div className="results-container">
      <h2 className="results-title">Audit Results</h2>
      {Object.entries(results).map(([modelName, metrics]) => (
        <div key={modelName} className="model-card">
          <h3 className="model-name">{modelName.replace('_', ' ')}</h3>
          
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-label">Accuracy</div>
              <div className={`metric-value ${getMetricClass(metrics.accuracy, 'accuracy')}`}>
                {(metrics.accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Quantum Bias Score</div>
              <div className={`metric-value ${getMetricClass(metrics.quantum_bias_score, 'bias')}`}>
                {(metrics.quantum_bias_score * 100).toFixed(1)}%
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Robustness Flip Rate</div>
              <div className={`metric-value ${getMetricClass(metrics.robustness_flip_fraction, 'robustness')}`}>
                {(metrics.robustness_flip_fraction * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-title">Performance Metrics</div>
            <Charts modelName={modelName} metrics={metrics} />
          </div>

          {metrics.confusion_matrix_url && (
            <div className="confusion-matrix-container">
              <h4 className="confusion-matrix-title">Confusion Matrix</h4>
              <img 
                src={metrics.confusion_matrix_url} 
                alt={`${modelName} Confusion Matrix`} 
                className="confusion-matrix-img"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}