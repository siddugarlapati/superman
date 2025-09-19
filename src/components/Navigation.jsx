import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/audit', label: 'Submit Audit', icon: '🔍' },
    { path: '/explorer', label: 'Model Explorer', icon: '🗂️' },
    { path: '/monitor', label: 'Real-time Monitor', icon: '⚡' },
    { path: '/certificates', label: 'Certificates', icon: '🏆' },
    { path: '/docs', label: 'Documentation', icon: '📚' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-logo">⚛️</span>
        <span className="nav-title">Quantum AI Auditor</span>
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}