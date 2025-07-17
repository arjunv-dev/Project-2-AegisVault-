import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, TrendingUp, Users, Server, Clock, Eye } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Threats Detected', value: '47', change: '+12%', trend: 'up', icon: Shield, color: 'text-red-400' },
    { label: 'Active Alerts', value: '8', change: '-23%', trend: 'down', icon: AlertTriangle, color: 'text-yellow-400' },
    { label: 'Network Health', value: '98.7%', change: '+0.3%', trend: 'up', icon: Activity, color: 'text-green-400' },
    { label: 'Monitored Endpoints', value: '1,247', change: '+45', trend: 'up', icon: Server, color: 'text-blue-400' },
  ]);

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: 'critical', message: 'Suspicious SSH login attempts detected', time: '2 minutes ago', ip: '192.168.1.100' },
    { id: 2, type: 'warning', message: 'Unusual network traffic pattern', time: '5 minutes ago', ip: '10.0.0.45' },
    { id: 3, type: 'info', message: 'Security scan completed successfully', time: '12 minutes ago', ip: 'localhost' },
    { id: 4, type: 'critical', message: 'Malware signature detected in packet', time: '18 minutes ago', ip: '203.0.113.1' },
  ]);

  const [threatData, setThreatData] = useState([
    { time: '00:00', threats: 5 },
    { time: '04:00', threats: 12 },
    { time: '08:00', threats: 23 },
    { time: '12:00', threats: 34 },
    { time: '16:00', threats: 28 },
    { time: '20:00', threats: 47 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.label === 'Threats Detected' 
          ? String(parseInt(metric.value) + Math.floor(Math.random() * 3))
          : metric.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Activity className="w-5 h-5 text-blue-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Security Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${metric.color}`} />
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Timeline */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Threat Detection Timeline</h3>
          <div className="space-y-4">
            {threatData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-gray-400">{data.time}</div>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(data.threats / 50) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-white font-medium">{data.threats}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 pl-4 py-2 rounded-r ${getAlertColor(alert.type)}`}>
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">{alert.ip}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-lg font-medium text-white">ML Engine</h4>
            <p className="text-sm text-green-400">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-medium text-white">Packet Monitor</h4>
            <p className="text-sm text-blue-400">Active</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Server className="w-8 h-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-medium text-white">Log Analyzer</h4>
            <p className="text-sm text-yellow-400">Processing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;