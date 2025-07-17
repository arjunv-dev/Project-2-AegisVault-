import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Check, X, Eye, Filter, Search } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'acknowledged' | 'resolved';
  timestamp: string;
  source: string;
  category: string;
}

const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'A001',
      title: 'Malware Detection',
      description: 'Suspicious executable detected with known malware signatures',
      severity: 'critical',
      status: 'new',
      timestamp: '2024-01-15 14:30:25',
      source: '192.168.1.100',
      category: 'Malware'
    },
    {
      id: 'A002',
      title: 'Brute Force Attack',
      description: 'Multiple failed login attempts detected from external IP',
      severity: 'high',
      status: 'acknowledged',
      timestamp: '2024-01-15 14:25:10',
      source: '198.51.100.42',
      category: 'Authentication'
    },
    {
      id: 'A003',
      title: 'Network Anomaly',
      description: 'Unusual network traffic patterns detected',
      severity: 'medium',
      status: 'new',
      timestamp: '2024-01-15 14:20:15',
      source: '10.0.0.1',
      category: 'Network'
    },
    {
      id: 'A004',
      title: 'Phishing Attempt',
      description: 'Suspicious email with malicious links detected',
      severity: 'high',
      status: 'resolved',
      timestamp: '2024-01-15 14:15:30',
      source: 'mail.example.com',
      category: 'Email'
    },
    {
      id: 'A005',
      title: 'Port Scan',
      description: 'Systematic port scanning activity detected',
      severity: 'low',
      status: 'acknowledged',
      timestamp: '2024-01-15 14:10:45',
      source: '172.16.0.100',
      category: 'Network'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const newAlert: Alert = {
          id: `A${String(Date.now()).slice(-3)}`,
          title: ['Malware Detection', 'Brute Force Attack', 'Network Anomaly', 'Phishing Attempt'][Math.floor(Math.random() * 4)],
          description: 'Automated security alert detected by AI engine',
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          status: 'new',
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          category: ['Malware', 'Authentication', 'Network', 'Email'][Math.floor(Math.random() * 4)]
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 15000);

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
      case 'new': return 'text-red-400 bg-red-500/10';
      case 'acknowledged': return 'text-yellow-400 bg-yellow-500/10';
      case 'resolved': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.status === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.source.includes(searchTerm) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateAlertStatus = (id: string, status: Alert['status']) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    if (selectedAlert?.id === id) {
      setSelectedAlert(null);
    }
  };

  const getAlertCounts = () => {
    return {
      total: alerts.length,
      new: alerts.filter(a => a.status === 'new').length,
      acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
      resolved: alerts.filter(a => a.status === 'resolved').length,
      critical: alerts.filter(a => a.severity === 'critical').length
    };
  };

  const counts = getAlertCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Alert Center</h2>
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-yellow-400" />
          <span className="text-sm text-gray-400">{counts.new} new alerts</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-2xl font-bold text-white">{counts.total}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">New</p>
              <p className="text-2xl font-bold text-red-400">{counts.new}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Acknowledged</p>
              <p className="text-2xl font-bold text-yellow-400">{counts.acknowledged}</p>
            </div>
            <Eye className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Resolved</p>
              <p className="text-2xl font-bold text-green-400">{counts.resolved}</p>
            </div>
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-400">{counts.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
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
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts List */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
          </div>
          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 hover:bg-gray-700/50 cursor-pointer transition-colors ${
                  selectedAlert?.id === alert.id ? 'bg-blue-500/10 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{alert.timestamp}</span>
                </div>
                <h4 className="font-medium text-white mb-1">{alert.title}</h4>
                <p className="text-sm text-gray-300 mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{alert.source}</span>
                  <span>{alert.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Details */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Alert Details</h3>
          </div>
          <div className="p-4">
            {selectedAlert ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{selectedAlert.title}</h4>
                  <p className="text-gray-300">{selectedAlert.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Severity</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedAlert.severity)}`}>
                      {selectedAlert.severity}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAlert.status)}`}>
                      {selectedAlert.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
                    <p className="text-sm text-white font-mono">{selectedAlert.source}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <p className="text-sm text-white">{selectedAlert.category}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Timestamp</label>
                    <p className="text-sm text-white">{selectedAlert.timestamp}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h5 className="text-sm font-medium text-gray-400 mb-3">Actions</h5>
                  <div className="flex space-x-2">
                    {selectedAlert.status === 'new' && (
                      <button
                        onClick={() => updateAlertStatus(selectedAlert.id, 'acknowledged')}
                        className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Acknowledge</span>
                      </button>
                    )}
                    {selectedAlert.status !== 'resolved' && (
                      <button
                        onClick={() => updateAlertStatus(selectedAlert.id, 'resolved')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Resolve</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(selectedAlert.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an alert to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCenter;