import React, { useState, useEffect } from 'react';
import { Network, Upload, Download, Search, Play, Pause, Filter } from 'lucide-react';

interface PacketData {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  flags: string[];
  payload: string;
}

const PacketAnalysis: React.FC = () => {
  const [packets, setPackets] = useState<PacketData[]>([
    {
      id: '1',
      timestamp: '14:30:25.123456',
      source: '192.168.1.100',
      destination: '203.0.113.1',
      protocol: 'TCP',
      length: 1500,
      info: 'HTTP GET request',
      flags: ['PSH', 'ACK'],
      payload: 'GET /api/data HTTP/1.1\\r\\nHost: example.com\\r\\n'
    },
    {
      id: '2',
      timestamp: '14:30:25.234567',
      source: '203.0.113.1',
      destination: '192.168.1.100',
      protocol: 'TCP',
      length: 1024,
      info: 'HTTP Response',
      flags: ['PSH', 'ACK'],
      payload: 'HTTP/1.1 200 OK\\r\\nContent-Type: application/json\\r\\n'
    },
    {
      id: '3',
      timestamp: '14:30:25.345678',
      source: '192.168.1.50',
      destination: '8.8.8.8',
      protocol: 'UDP',
      length: 64,
      info: 'DNS Query',
      flags: [],
      payload: 'DNS Query for example.com'
    },
    {
      id: '4',
      timestamp: '14:30:25.456789',
      source: '8.8.8.8',
      destination: '192.168.1.50',
      protocol: 'UDP',
      length: 128,
      info: 'DNS Response',
      flags: [],
      payload: 'DNS Response: 203.0.113.1'
    },
    {
      id: '5',
      timestamp: '14:30:25.567890',
      source: '192.168.1.75',
      destination: '172.16.0.1',
      protocol: 'ICMP',
      length: 84,
      info: 'Ping Request',
      flags: [],
      payload: 'ICMP Echo Request'
    }
  ]);

  const [selectedPacket, setSelectedPacket] = useState<PacketData | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [filter, setFilter] = useState('');
  const [protocolFilter, setProtocolFilter] = useState('all');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCapturing) {
      interval = setInterval(() => {
        const newPacket: PacketData = {
          id: String(Date.now()),
          timestamp: new Date().toTimeString().slice(0, 8) + '.123456',
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          destination: `10.0.0.${Math.floor(Math.random() * 255)}`,
          protocol: ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random() * 3)],
          length: Math.floor(Math.random() * 1500) + 64,
          info: ['HTTP Request', 'DNS Query', 'SSH Connection', 'FTP Transfer'][Math.floor(Math.random() * 4)],
          flags: ['PSH', 'ACK', 'SYN', 'FIN'].filter(() => Math.random() > 0.5),
          payload: 'Captured packet data...'
        };
        setPackets(prev => [newPacket, ...prev.slice(0, 99)]);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCapturing]);

  const filteredPackets = packets.filter(packet => {
    const matchesFilter = packet.source.includes(filter) || 
                         packet.destination.includes(filter) ||
                         packet.info.toLowerCase().includes(filter.toLowerCase());
    const matchesProtocol = protocolFilter === 'all' || packet.protocol === protocolFilter;
    return matchesFilter && matchesProtocol;
  });

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'TCP': return 'bg-blue-500/20 text-blue-400';
      case 'UDP': return 'bg-green-500/20 text-green-400';
      case 'ICMP': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, this would parse the PCAP file
      console.log('Uploading PCAP file:', file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Packet Analysis</h2>
        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept=".pcap,.pcapng"
            onChange={handleFileUpload}
            className="hidden"
            id="pcap-upload"
          />
          <label
            htmlFor="pcap-upload"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PCAP</span>
          </label>
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isCapturing
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCapturing ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop Capture</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Capture</span>
              </>
            )}
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
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
            placeholder="Filter packets (IP, port, protocol)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={protocolFilter}
            onChange={(e) => setProtocolFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Protocols</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Packets</p>
              <p className="text-2xl font-bold text-white">{packets.length}</p>
            </div>
            <Network className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">TCP Packets</p>
              <p className="text-2xl font-bold text-blue-400">{packets.filter(p => p.protocol === 'TCP').length}</p>
            </div>
            <Network className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">UDP Packets</p>
              <p className="text-2xl font-bold text-green-400">{packets.filter(p => p.protocol === 'UDP').length}</p>
            </div>
            <Network className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Size</p>
              <p className="text-2xl font-bold text-yellow-400">{(packets.reduce((sum, p) => sum + p.length, 0) / 1024).toFixed(1)}KB</p>
            </div>
            <Network className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Packet List */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Captured Packets</h3>
          </div>
          <div className="overflow-y-auto max-h-96">
            <table className="w-full">
              <thead className="bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Time</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Source</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Destination</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Protocol</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Length</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPackets.map((packet) => (
                  <tr
                    key={packet.id}
                    onClick={() => setSelectedPacket(packet)}
                    className={`hover:bg-gray-700/50 cursor-pointer transition-colors ${
                      selectedPacket?.id === packet.id ? 'bg-blue-500/20' : ''
                    }`}
                  >
                    <td className="px-3 py-2 text-xs text-gray-300 font-mono">{packet.timestamp}</td>
                    <td className="px-3 py-2 text-xs text-gray-300 font-mono">{packet.source}</td>
                    <td className="px-3 py-2 text-xs text-gray-300 font-mono">{packet.destination}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getProtocolColor(packet.protocol)}`}>
                        {packet.protocol}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-300">{packet.length}</td>
                    <td className="px-3 py-2 text-xs text-gray-300 truncate max-w-xs">{packet.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packet Details */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Packet Details</h3>
          </div>
          <div className="p-4">
            {selectedPacket ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Timestamp</label>
                    <p className="text-sm text-white font-mono">{selectedPacket.timestamp}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Protocol</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getProtocolColor(selectedPacket.protocol)}`}>
                      {selectedPacket.protocol}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
                    <p className="text-sm text-white font-mono">{selectedPacket.source}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Destination</label>
                    <p className="text-sm text-white font-mono">{selectedPacket.destination}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Length</label>
                    <p className="text-sm text-white">{selectedPacket.length} bytes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Flags</label>
                    <div className="flex space-x-1">
                      {selectedPacket.flags.map((flag, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-purple-500/20 text-purple-400">
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Info</label>
                  <p className="text-sm text-white">{selectedPacket.info}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Payload</label>
                  <div className="bg-gray-900 border border-gray-600 rounded p-3 max-h-32 overflow-y-auto">
                    <pre className="text-xs text-green-400 font-mono">{selectedPacket.payload}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Network className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a packet to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacketAnalysis;