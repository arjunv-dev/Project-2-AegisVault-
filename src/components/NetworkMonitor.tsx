import React, { useState, useEffect } from 'react';
import { Network, Activity, Globe, Server, Wifi, TrendingUp, Eye, Shield } from 'lucide-react';

interface NetworkConnection {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  port: number;
  status: 'active' | 'closed' | 'filtered';
  bytes: number;
  packets: number;
  duration: string;
  risk: 'low' | 'medium' | 'high';
}

const NetworkMonitor: React.FC = () => {
  const [connections, setConnections] = useState<NetworkConnection[]>([
    {
      id: '1',
      source: '192.168.1.100',
      destination: '203.0.113.1',
      protocol: 'TCP',
      port: 443,
      status: 'active',
      bytes: 2048576,
      packets: 1534,
      duration: '00:05:23',
      risk: 'low'
    },
    {
      id: '2',
      source: '192.168.1.50',
      destination: '8.8.8.8',
      protocol: 'UDP',
      port: 53,
      status: 'active',
      bytes: 1024,
      packets: 8,
      duration: '00:00:02',
      risk: 'low'
    },
    {
      id: '3',
      source: '192.168.1.75',
      destination: '172.16.0.1',
      protocol: 'TCP',
      port: 22,
      status: 'active',
      bytes: 45632,
      packets: 89,
      duration: '00:12:45',
      risk: 'medium'
    },
    {
      id: '4',
      source: '10.0.0.1',
      destination: '192.168.1.100',
      protocol: 'TCP',
      port: 80,
      status: 'filtered',
      bytes: 0,
      packets: 0,
      duration: '00:00:00',
      risk: 'high'
    }
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalConnections: 247,
    activeConnections: 156,
    bandwidth: '45.7 Mbps',
    packetsPerSecond: 1247,
    threats: 8,
    latency: '12ms'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update network stats
      setNetworkStats(prev => ({
        ...prev,
        totalConnections: prev.totalConnections + Math.floor(Math.random() * 10) - 5,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 6) - 3,
        bandwidth: `${(Math.random() * 50 + 30).toFixed(1)} Mbps`,
        packetsPerSecond: prev.packetsPerSecond + Math.floor(Math.random() * 200) - 100,
        latency: `${Math.floor(Math.random() * 20) + 10}ms`
      }));

      // Simulate new connections
      if (Math.random() < 0.3) {
        const newConnection: NetworkConnection = {
          id: String(Date.now()),
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          destination: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          protocol: ['TCP', 'UDP'][Math.floor(Math.random() * 2)],
          port: [80, 443, 22, 53, 25, 110][Math.floor(Math.random() * 6)],
          status: ['active', 'closed', 'filtered'][Math.floor(Math.random() * 3)] as any,
          bytes: Math.floor(Math.random() * 1000000),
          packets: Math.floor(Math.random() * 1000),
          duration: '00:00:01',
          risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
        };
        setConnections(prev => [newConnection, ...prev.slice(0, 19)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      case 'filtered': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Network Monitor</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Monitoring Active</span>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Connections</p>
              <p className="text-2xl font-bold text-white">{networkStats.totalConnections}</p>
            </div>
            <Network className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-400">{networkStats.activeConnections}</p>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Bandwidth</p>
              <p className="text-2xl font-bold text-blue-400">{networkStats.bandwidth}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Packets/sec</p>
              <p className="text-2xl font-bold text-yellow-400">{networkStats.packetsPerSecond}</p>
            </div>
            <Activity className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Threats</p>
              <p className="text-2xl font-bold text-red-400">{networkStats.threats}</p>
            </div>
            <Shield className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Latency</p>
              <p className="text-2xl font-bold text-purple-400">{networkStats.latency}</p>
            </div>
            <Wifi className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Network Topology */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Network Topology</h3>
        <div className="flex items-center justify-center space-x-8 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-sm text-gray-300">Internet</p>
          </div>
          <div className="w-16 h-0.5 bg-gray-600"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Network className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-sm text-gray-300">Router</p>
          </div>
          <div className="w-16 h-0.5 bg-gray-600"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Server className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-sm text-gray-300">Server</p>
          </div>
          <div className="w-16 h-0.5 bg-gray-600"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Network className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-300">Clients</p>
          </div>
        </div>
      </div>

      {/* Active Connections */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Active Connections</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bytes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Packets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {connections.map((connection) => (
                <tr key={connection.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{connection.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{connection.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{connection.protocol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{connection.port}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(connection.status)}`}>
                      {connection.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatBytes(connection.bytes)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{connection.packets}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{connection.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(connection.risk)}`}>
                      {connection.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Protocol Distribution</h3>
          <div className="space-y-4">
            {['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS'].map((protocol, index) => {
              const percentage = Math.floor(Math.random() * 60) + 10;
              return (
                <div key={protocol} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{protocol}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-12">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Destinations</h3>
          <div className="space-y-3">
            {[
              { ip: '8.8.8.8', location: 'Google DNS', connections: 45 },
              { ip: '1.1.1.1', location: 'Cloudflare DNS', connections: 32 },
              { ip: '203.0.113.1', location: 'External Server', connections: 28 },
              { ip: '172.16.0.1', location: 'Internal Gateway', connections: 21 },
              { ip: '192.168.1.1', location: 'Router', connections: 18 }
            ].map((dest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                <div>
                  <p className="text-sm font-medium text-white font-mono">{dest.ip}</p>
                  <p className="text-xs text-gray-400">{dest.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-400">{dest.connections}</p>
                  <p className="text-xs text-gray-400">connections</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitor;