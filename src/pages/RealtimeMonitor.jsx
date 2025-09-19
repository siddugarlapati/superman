import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function RealtimeMonitor() {
  const [anomalies, setAnomalies] = useState([]);
  const [quarantinedModels, setQuarantinedModels] = useState([]);
  const [liveMetrics, setLiveMetrics] = useState({
    throughput: 0,
    latency: 0,
    errorRate: 0,
    activeConnections: 0
  });
  const [timelineData, setTimelineData] = useState([]);
  const [logs, setLogs] = useState([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update live metrics
      setLiveMetrics(prev => ({
        throughput: Math.floor(Math.random() * 100) + 50,
        latency: Math.random() * 2 + 0.5,
        errorRate: Math.random() * 5,
        activeConnections: Math.floor(Math.random() * 50) + 20
      }));

      // Add new timeline data point
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      setTimelineData(prev => {
        const newData = [...prev, {
          time: timeStr,
          anomalies: Math.floor(Math.random() * 10),
          threats: Math.floor(Math.random() * 5)
        }];
        return newData.slice(-20); // Keep last 20 points
      });

      // Add new log entry occasionally
      if (Math.random() < 0.3) {
        const logTypes = ['INFO', 'WARN', 'ERROR', 'ALERT'];
        const messages = [
          'Quantum node QN-001 processing batch',
          'Bias threshold exceeded for model HR-v2.1',
          'Adversarial pattern detected in submission',
          'Certificate verification completed',
          'Homomorphic encryption key rotated'
        ];
        
        setLogs(prev => {
          const newLog = {
            id: Date.now(),
            timestamp: now.toLocaleTimeString(),
            type: logTypes[Math.floor(Math.random() * logTypes.length)],
            message: messages[Math.floor(Math.random() * messages.length)]
          };
          return [newLog, ...prev.slice(0, 49)]; // Keep last 50 logs
        });
      }
    }, 2000);

    // Initialize with some data
    setAnomalies([
      { id: 1, model: 'HR-Classifier-v2.1', severity: 'High', detected: '2 min ago', type: 'Gender Bias' },
      { id: 2, model: 'Loan-AI-v3', severity: 'Medium', detected: '5 min ago', type: 'Age Discrimination' },
      { id: 3, model: 'Resume-Filter', severity: 'Low', detected: '8 min ago', type: 'Accuracy Drift' }
    ]);

    setQuarantinedModels([
      { id: 1, model: 'Malicious-Model-X', reason: 'Adversarial Attack', quarantined: '1 hour ago' },
      { id: 2, model: 'Biased-Classifier', reason: 'Extreme Bias', quarantined: '3 hours ago' }
    ]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="realtime-monitor-page">
      <div className="page-header">
        <h1>Real-time Monitor</h1>
        <p>Live monitoring of AI fairness auditing operations and threat detection</p>
        <div className="status-indicator">
          <span className="status-dot active"></span>
          <span>System Operational</span>
        </div>
      </div>

      <div className="monitor-grid">
        <div className="live-metrics-section">
          <div className="section-card">
            <h3>Live Metrics</h3>
            <div className="metrics-grid-live">
              <div className="metric-card">
                <div className="metric-icon">⚡</div>
                <div className="metric-info">
                  <div className="metric-value">{liveMetrics.throughput}</div>
                  <div className="metric-label">Audits/min</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⏱️</div>
                <div className="metric-info">
                  <div className="metric-value">{liveMetrics.latency.toFixed(1)}ms</div>
                  <div className="metric-label">Avg Latency</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⚠️</div>
                <div className="metric-info">
                  <div className="metric-value">{liveMetrics.errorRate.toFixed(1)}%</div>
                  <div className="metric-label">Error Rate</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🔗</div>
                <div className="metric-info">
                  <div className="metric-value">{liveMetrics.activeConnections}</div>
                  <div className="metric-label">Active Connections</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-section">
          <div className="section-card">
            <h3>Anomaly Timeline</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ff" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e1e8ff',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="anomalies" 
                    stackId="1"
                    stroke="#dc2626" 
                    fill="#dc2626"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="threats" 
                    stackId="1"
                    stroke="#d97706" 
                    fill="#d97706"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="anomalies-section">
          <div className="section-card">
            <h3>Recent Anomalies</h3>
            <div className="anomalies-list">
              {anomalies.map(anomaly => (
                <div key={anomaly.id} className="anomaly-item">
                  <div className="anomaly-header">
                    <span className="anomaly-model">{anomaly.model}</span>
                    <span className={`severity-badge ${anomaly.severity.toLowerCase()}`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="anomaly-details">
                    <span className="anomaly-type">{anomaly.type}</span>
                    <span className="anomaly-time">{anomaly.detected}</span>
                  </div>
                  <div className="anomaly-actions">
                    <button className="action-btn investigate">Investigate</button>
                    <button className="action-btn quarantine">Quarantine</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sanctuary-section">
          <div className="section-card">
            <h3>Sanctuary Feed</h3>
            <p className="sanctuary-description">Quarantined models and threats</p>
            <div className="sanctuary-list">
              {quarantinedModels.map(model => (
                <div key={model.id} className="sanctuary-item">
                  <div className="sanctuary-icon">🛡️</div>
                  <div className="sanctuary-info">
                    <div className="sanctuary-model">{model.model}</div>
                    <div className="sanctuary-reason">{model.reason}</div>
                    <div className="sanctuary-time">{model.quarantined}</div>
                  </div>
                  <div className="sanctuary-actions">
                    <button className="action-btn review">Review</button>
                    <button className="action-btn release">Release</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="logs-section">
          <div className="section-card">
            <h3>Live Logs</h3>
            <div className="logs-container">
              {logs.map(log => (
                <div key={log.id} className={`log-entry ${log.type.toLowerCase()}`}>
                  <span className="log-timestamp">{log.timestamp}</span>
                  <span className={`log-type ${log.type.toLowerCase()}`}>{log.type}</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="log-entry info">
                  <span className="log-message">Waiting for log entries...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="threat-map-section">
          <div className="section-card">
            <h3>Threat Detection Map</h3>
            <div className="threat-map">
              <div className="threat-visualization">
                <div className="threat-node normal" style={{top: '20%', left: '30%'}}>
                  <div className="node-label">QN-001</div>
                </div>
                <div className="threat-node warning" style={{top: '60%', left: '20%'}}>
                  <div className="node-label">QN-002</div>
                </div>
                <div className="threat-node critical" style={{top: '40%', left: '70%'}}>
                  <div className="node-label">QN-003</div>
                </div>
                <div className="threat-node normal" style={{top: '80%', left: '60%'}}>
                  <div className="node-label">QN-004</div>
                </div>
              </div>
              <div className="threat-legend">
                <div className="legend-item">
                  <div className="legend-dot normal"></div>
                  <span>Normal</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot warning"></div>
                  <span>Warning</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot critical"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}