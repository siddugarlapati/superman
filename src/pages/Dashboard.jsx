import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ApiService from '../services/api';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await ApiService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-page">
        <div className="error">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Audit Dashboard</h1>
        <p>Real-time overview of AI fairness auditing operations</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">🎯</div>
          <div className="kpi-content">
            <div className="kpi-number">{dashboardData.kpis.totalModels.toLocaleString()}</div>
            <div className="kpi-label">Total Models Processed</div>
            <div className="kpi-change positive">+12% this week</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">⚡</div>
          <div className="kpi-content">
            <div className="kpi-number">{dashboardData.kpis.activeAudits}</div>
            <div className="kpi-label">Active Audits</div>
            <div className="kpi-change neutral">Real-time</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">⏱️</div>
          <div className="kpi-content">
            <div className="kpi-number">{dashboardData.kpis.avgLatency}ms</div>
            <div className="kpi-label">Avg Detection Latency</div>
            <div className="kpi-change positive">-15% improvement</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon">✅</div>
          <div className="kpi-content">
            <div className="kpi-number">{dashboardData.kpis.passRate}%</div>
            <div className="kpi-label">Fairness Pass Rate</div>
            <div className="kpi-change positive">+2.1% this month</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-section">
          <div className="section-header">
            <h3>Audit Timeline</h3>
            <p>Audits completed over time</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.timeline}>
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
                <Line 
                  type="monotone" 
                  dataKey="audits" 
                  stroke="#1e3a8a" 
                  strokeWidth={3}
                  dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cluster-status">
          <div className="section-header">
            <h3>Cluster Status</h3>
            <p>Quantum and classical nodes</p>
          </div>
          <div className="status-grid">
            <div className="status-item">
              <div className="status-indicator quantum-active"></div>
              <div className="status-info">
                <div className="status-label">Quantum Nodes</div>
                <div className="status-value">{dashboardData.clusterStatus.quantumNodes} Active</div>
              </div>
            </div>
            <div className="status-item">
              <div className="status-indicator he-active"></div>
              <div className="status-info">
                <div className="status-label">HE Nodes</div>
                <div className="status-value">{dashboardData.clusterStatus.heNodes} Active</div>
              </div>
            </div>
            <div className="status-item">
              <div className="status-indicator queue"></div>
              <div className="status-info">
                <div className="status-label">Queue Depth</div>
                <div className="status-value">{dashboardData.clusterStatus.queueDepth} Jobs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="incidents-section">
        <div className="section-header">
          <h3>Recent Incidents</h3>
          <p>Latest fairness violations and anomalies</p>
        </div>
        <div className="incidents-table">
          <div className="table-header">
            <div>Model</div>
            <div>Organization</div>
            <div>Severity</div>
            <div>Issue</div>
            <div>Time</div>
            <div>Actions</div>
          </div>
          {dashboardData.recentIncidents.map(incident => (
            <div key={incident.id} className="table-row">
              <div className="model-name">{incident.model}</div>
              <div>{incident.org}</div>
              <div>
                <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
              </div>
              <div>{incident.issue}</div>
              <div className="time-ago">{incident.time}</div>
              <div className="actions">
                <button className="action-btn">View</button>
                <button className="action-btn">Investigate</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}