import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, Filter, Download, RefreshCw } from 'lucide-react';

interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  description: string;
  timestamp: string;
  confidence: number;
  status: 'active' | 'resolved' | 'investigating';
}

const ThreatDetection: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([
    {
      id: 'T001',
      type: 'Malware',
      severity: 'critical',
      source: '203.0.113.1',
      target: '192.168.1.100',
      description: 'Suspicious executable detected with malware signatures',
      timestamp: '2024-01-15 14:30:25',
      confidence: 95,
      status: 'active'
    },
    {
      id: 'T002',
      type: 'Brute Force',
      severity: 'high',
      source: '198.51.100.42',
      target: '192.168.1.50',
      description: 'Multiple failed SSH login attempts detected',
      timestamp: '2024-01-15 14:25:10',
      confidence: 88,
      status: 'investigating'
    },
    {
      id: 'T003',
      type: 'DDoS',
      severity: 'medium',
      source: 'Multiple',
      target: '192.168.1.1',
      description: 'Abnormal traffic volume detected',
      timestamp: '2024-01-15 14:20:15',
      confidence: 72,
      status: 'resolved'
    },
    {
      id: 'T004',
      type: 'Phishing',
      severity: 'high',
      source: '185.199.108.153',
      target: '192.168.1.75',
      description: 'Suspicious email with malicious attachments',
      timestamp: '2024-01-15 14:15:30',
      confidence: 91,
      status: 'active'
    },
    {
      id: 'T005',
      type: 'Port Scan',
      severity: 'low',
      source: '172.16.0.100',
      target: '192.168.1.0/24',
      description: 'Systematic port scanning activity detected',
      timestamp: '2024-01-15 14:10:45',
      confidence: 65,
      status: 'resolved'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new threats
      if (Math.random() < 0.3) {
        const newThreat: Threat = {
          id: `T${String(Date.now()).slice(-3)}`,
          type: ['Malware', 'Brute Force', 'DDoS', 'Phishing', 'Port Scan'][Math.floor(Math.random() * 5)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          target: `10.0.0.${Math.floor(Math.random() * 255)}`,
          description: 'Automated threat detection alert',
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          confidence: Math.floor(Math.random() * 40) + 60,
          status: 'active'
        };
        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/10';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/10';
      case 'resolved': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesFilter = filter === 'all' || threat.severity === filter;
    const matchesSearch = threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.source.includes(searchTerm) ||
                         threat.target.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Add a new threat after scan
      const newThreat: Threat = {
        id: `T${String(Date.now()).slice(-3)}`,
        type: 'Scan Result',
        severity: 'medium',
        source: 'Internal Scanner',
        target: 'Network',
        description: 'Scheduled security scan completed - vulnerabilities detected',
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        confidence: 85,
        status: 'active'
      };
      setThreats(prev => [newThreat, ...prev]);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Threat Detection</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={runScan}
            disabled={isScanning}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isScanning 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search threats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Threats</p>
              <p className="text-2xl font-bold text-white">{threats.length}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-400">{threats.filter(t => t.severity === 'critical').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-yellow-400">{threats.filter(t => t.status === 'active').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Resolved</p>
              <p className="text-2xl font-bold text-green-400">{threats.filter(t => t.status === 'resolved').length}</p>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Threats Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{threat.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{threat.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{threat.target}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{threat.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.confidence}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;