import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SubmitAudit from './pages/SubmitAudit';
import ModelExplorer from './pages/ModelExplorer';
import AuditDetail from './pages/AuditDetail';
import RealtimeMonitor from './pages/RealtimeMonitor';
import CertificateRepository from './pages/CertificateRepository';
import Documentation from './pages/Documentation';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/audit" element={<SubmitAudit />} />
            <Route path="/explorer" element={<ModelExplorer />} />
            <Route path="/detail/:id" element={<AuditDetail />} />
            <Route path="/monitor" element={<RealtimeMonitor />} />
            <Route path="/certificates" element={<CertificateRepository />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}