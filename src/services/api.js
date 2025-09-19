const API_BASE_URL = 'http://127.0.0.1:5000';

class ApiService {
  async runAudit(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/audit`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Mock data for dashboard - replace with real API calls when available
  async getDashboardData() {
    // This would typically come from your backend
    return {
      kpis: {
        totalModels: 1247,
        activeAudits: 3,
        avgLatency: 0.8,
        passRate: 94.2
      },
      timeline: [
        { time: '00:00', audits: 45 },
        { time: '04:00', audits: 52 },
        { time: '08:00', audits: 78 },
        { time: '12:00', audits: 95 },
        { time: '16:00', audits: 87 },
        { time: '20:00', audits: 63 },
        { time: '24:00', audits: 71 }
      ],
      clusterStatus: {
        quantumNodes: 8,
        heNodes: 12,
        queueDepth: 47
      },
      recentIncidents: [
        { 
          id: 1, 
          model: 'HR-Classifier-v2.1', 
          org: 'TechCorp', 
          severity: 'High', 
          issue: 'Gender bias detected', 
          time: '2 min ago' 
        },
        { 
          id: 2, 
          model: 'Loan-Approval-AI', 
          org: 'FinanceInc', 
          severity: 'Medium', 
          issue: 'Age discrimination', 
          time: '15 min ago' 
        },
        { 
          id: 3, 
          model: 'Resume-Screener', 
          org: 'StartupXYZ', 
          severity: 'Low', 
          issue: 'Minor accuracy drift', 
          time: '1 hour ago' 
        }
      ]
    };
  }

  // Mock data for model explorer - replace with real API calls
  async getModels(filters = {}) {
    return [
      {
        id: 1,
        name: 'HR-Classifier-v2.1',
        org: 'TechCorp',
        dataset: 'recruitment',
        result: 'fail',
        biasScore: 0.73,
        certificate: 'cert_001',
        timestamp: '2024-01-15 14:30',
        metrics: {
          accuracy: 0.67,
          quantum_bias_score: 0.73,
          robustness_flip_fraction: 0.45
        }
      },
      {
        id: 2,
        name: 'Loan-Approval-AI',
        org: 'FinanceInc',
        dataset: 'financial',
        result: 'warn',
        biasScore: 0.42,
        certificate: 'cert_002',
        timestamp: '2024-01-15 13:15',
        metrics: {
          accuracy: 0.78,
          quantum_bias_score: 0.42,
          robustness_flip_fraction: 0.28
        }
      },
      {
        id: 3,
        name: 'Resume-Screener',
        org: 'StartupXYZ',
        dataset: 'recruitment',
        result: 'pass',
        biasScore: 0.18,
        certificate: 'cert_003',
        timestamp: '2024-01-15 12:00',
        metrics: {
          accuracy: 0.89,
          quantum_bias_score: 0.18,
          robustness_flip_fraction: 0.12
        }
      }
    ].filter(model => {
      return (!filters.dataset || filters.dataset === 'all' || model.dataset === filters.dataset) &&
             (!filters.organization || filters.organization === 'all' || model.org === filters.organization) &&
             (!filters.severity || filters.severity === 'all' || model.result === filters.severity);
    });
  }

  // Get detailed audit information
  async getAuditDetail(id) {
    const models = await this.getModels();
    const model = models.find(m => m.id === parseInt(id));
    
    if (!model) {
      throw new Error('Model not found');
    }

    return {
      ...model,
      auditHash: '0x7f8e9d0c1b2a3e4f5g6h7i8j9k0l',
      uploadTime: model.timestamp + ':00 UTC',
      keyFingerprint: 'SHA256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4',
      groupMetrics: [
        { group: 'Male', tpr: 0.89, fpr: 0.12, precision: 0.85 },
        { group: 'Female', tpr: 0.71, fpr: 0.18, precision: 0.76 },
        { group: 'Age 25-35', tpr: 0.92, fpr: 0.09, precision: 0.88 },
        { group: 'Age 35+', tpr: 0.68, fpr: 0.21, precision: 0.72 }
      ],
      adversarialAnalysis: {
        detected: model.result === 'fail',
        attackVector: 'Feature manipulation in education field',
        confidence: 0.89,
        explanation: 'The model shows vulnerability to adversarial examples that manipulate education credentials to bias hiring decisions.'
      }
    };
  }
}

const apiService = new ApiService();
export default apiService;