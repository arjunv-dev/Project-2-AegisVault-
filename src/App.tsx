import React, { useState } from 'react';
import { Shield, AlertTriangle, Activity, FileText, Network, Settings, Bell, Eye, Lock } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ThreatDetection from './components/ThreatDetection';
import PacketAnalysis from './components/PacketAnalysis';
import AlertCenter from './components/AlertCenter';
import LogMonitoring from './components/LogMonitoring';
import NetworkMonitor from './components/NetworkMonitor';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'threats', label: 'Threat Detection', icon: Shield },
    { id: 'packets', label: 'Packet Analysis', icon: Network },
    { id: 'alerts', label: 'Alert Center', icon: AlertTriangle },
    { id: 'logs', label: 'Log Monitoring', icon: FileText },
    { id: 'network', label: 'Network Monitor', icon: Eye },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'threats':
        return <ThreatDetection />;
      case 'packets':
        return <PacketAnalysis />;
      case 'alerts':
        return <AlertCenter />;
      case 'logs':
        return <LogMonitoring />;
      case 'network':
        return <NetworkMonitor />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AegisVault</h1>
              <p className="text-sm text-gray-400">Cybersecurity AI Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">System Active</span>
            </div>
            <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;