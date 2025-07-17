import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, AlertTriangle, Activity, Server, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  source: string;
  message: string;
  category: string;
  anomaly: boolean;
}

const LogMonitoring: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      level: 'ERROR',
      source: 'auth.service',
      message: 'Failed login attempt for user admin from 192.168.1.100',
      category: 'Authentication',
      anomaly: true
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:30:20',
      level: 'INFO',
      source: 'nginx',
      message: 'GET /api/users - 200 OK - 45ms',
      category: 'Web Server',
      anomaly: false
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:30:15',
      level: 'WARN',
      source: 'system.monitor',
      message: 'High CPU usage detected: 89%',
      category: 'System',
      anomaly: true
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:30:10',
      level: 'DEBUG',
      source: 'database',
      message: 'Query executed: SELECT * FROM users WHERE active = true',
      category: 'Database',
      anomaly: false
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:30:05',
      level: 'ERROR',
      source: 'firewall',
      message: 'Blocked connection attempt from 203.0.113.1',
      category: 'Network',
      anomaly: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnomalies, setShowAnomalies] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: String(Date.now()),
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        level: ['INFO', 'WARN', 'ERROR', 'DEBUG'][Math.floor(Math.random() * 4)] as any,
        source: ['auth.service', 'nginx', 'system.monitor', 'database', 'firewall'][Math.floor(Math.random() * 5)],
        message: [
          'User logged in successfully',
          'API request processed',
          'System resource usage normal',
          'Database connection established',
          'Network traffic analyzed'
        ][Math.floor(Math.random() * 5)],
        category: ['Authentication', 'Web Server', 'System', 'Database', 'Network'][Math.floor(Math.random() * 5)],
        anomaly: Math.random() < 0.3
      };
      setLogs(prev => [newLog, ...prev.slice(0, 99)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'bg-red-500/20 text-red-400';
      case 'WARN': return 'bg-yellow-500/20 text-yellow-400';
      case 'INFO': return 'bg-blue-500/20 text-blue-400';
      case 'DEBUG': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAnomaly = !showAnomalies || log.anomaly;
    return matchesFilter && matchesSearch && matchesAnomaly;
  });

  const getLogStats = () => {
    return {
      total: logs.length,
      errors: logs.filter(l => l.level === 'ERROR').length,
      warnings: logs.filter(l => l.level === 'WARN').length,
      anomalies: logs.filter(l => l.anomaly).length
    };
  };

  const stats = getLogStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Log Monitoring</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Logs</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Errors</p>
              <p className="text-2xl font-bold text-red-400">{stats.errors}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Warnings</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.warnings}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Anomalies</p>
              <p className="text-2xl font-bold text-purple-400">{stats.anomalies}</p>
            </div>
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
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
            <option value="all">All Levels</option>
            <option value="ERROR">Error</option>
            <option value="WARN">Warning</option>
            <option value="INFO">Info</option>
            <option value="DEBUG">Debug</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anomalies"
            checked={showAnomalies}
            onChange={(e) => setShowAnomalies(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
          />
          <label htmlFor="anomalies" className="text-sm text-gray-300">Show Anomalies Only</label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log Stream */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Live Log Stream</h3>
          </div>
          <div className="overflow-y-auto max-h-96 p-2">
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`p-3 rounded hover:bg-gray-700/50 cursor-pointer transition-colors border-l-4 ${
                    log.anomaly ? 'border-purple-500 bg-purple-500/5' : 'border-transparent'
                  } ${selectedLog?.id === log.id ? 'bg-blue-500/10' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className="text-xs text-gray-400">{log.source}</span>
                      {log.anomaly && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-purple-500/20 text-purple-400">
                          ANOMALY
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-white font-mono">{log.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{log.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Log Details */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Log Details</h3>
          </div>
          <div className="p-4">
            {selectedLog ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <p className="text-white font-mono text-sm bg-gray-900 p-3 rounded border">{selectedLog.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getLevelColor(selectedLog.level)}`}>
                      {selectedLog.level}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
                    <p className="text-sm text-white">{selectedLog.source}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <p className="text-sm text-white">{selectedLog.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Timestamp</label>
                    <p className="text-sm text-white font-mono">{selectedLog.timestamp}</p>
                  </div>
                </div>

                {selectedLog.anomaly && (
                  <div className="border border-purple-500 bg-purple-500/10 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">Anomaly Detected</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      This log entry has been flagged as anomalous by the AI detection system. 
                      It may indicate suspicious activity or system issues that require attention.
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <h5 className="text-sm font-medium text-gray-400 mb-3">Analysis</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Risk Level:</span>
                      <span className={`text-sm font-medium ${
                        selectedLog.level === 'ERROR' ? 'text-red-400' : 
                        selectedLog.level === 'WARN' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {selectedLog.level === 'ERROR' ? 'High' : selectedLog.level === 'WARN' ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Anomaly Score:</span>
                      <span className="text-sm font-medium text-purple-400">
                        {selectedLog.anomaly ? '85%' : '12%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Similar Events:</span>
                      <span className="text-sm font-medium text-blue-400">
                        {Math.floor(Math.random() * 20) + 1} in last 24h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a log entry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogMonitoring;