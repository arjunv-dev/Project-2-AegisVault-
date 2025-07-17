import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Network, Save, RefreshCw } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      criticalOnly: false,
      alertThreshold: 'medium'
    },
    security: {
      autoBlock: true,
      mlEngine: true,
      realTimeScanning: true,
      anomalyDetection: true,
      confidenceThreshold: 75
    },
    network: {
      packetCapture: true,
      deepInspection: true,
      bandwidthMonitoring: true,
      trafficAnalysis: true,
      logRetention: 30
    },
    system: {
      autoUpdates: true,
      backupEnabled: true,
      performanceMode: 'balanced',
      logLevel: 'info'
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    // Reset to default values
    setSettings({
      notifications: {
        emailAlerts: true,
        pushNotifications: true,
        criticalOnly: false,
        alertThreshold: 'medium'
      },
      security: {
        autoBlock: true,
        mlEngine: true,
        realTimeScanning: true,
        anomalyDetection: true,
        confidenceThreshold: 75
      },
      network: {
        packetCapture: true,
        deepInspection: true,
        bandwidthMonitoring: true,
        trafficAnalysis: true,
        logRetention: 30
      },
      system: {
        autoUpdates: true,
        backupEnabled: true,
        performanceMode: 'balanced',
        logLevel: 'info'
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={resetSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Email Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Critical Only</label>
              <input
                type="checkbox"
                checked={settings.notifications.criticalOnly}
                onChange={(e) => handleSettingChange('notifications', 'criticalOnly', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Alert Threshold</label>
              <select
                value={settings.notifications.alertThreshold}
                onChange={(e) => handleSettingChange('notifications', 'alertThreshold', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Auto-block Threats</label>
              <input
                type="checkbox"
                checked={settings.security.autoBlock}
                onChange={(e) => handleSettingChange('security', 'autoBlock', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">ML Engine</label>
              <input
                type="checkbox"
                checked={settings.security.mlEngine}
                onChange={(e) => handleSettingChange('security', 'mlEngine', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Real-time Scanning</label>
              <input
                type="checkbox"
                checked={settings.security.realTimeScanning}
                onChange={(e) => handleSettingChange('security', 'realTimeScanning', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Anomaly Detection</label>
              <input
                type="checkbox"
                checked={settings.security.anomalyDetection}
                onChange={(e) => handleSettingChange('security', 'anomalyDetection', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Confidence Threshold: {settings.security.confidenceThreshold}%</label>
              <input
                type="range"
                min="50"
                max="100"
                value={settings.security.confidenceThreshold}
                onChange={(e) => handleSettingChange('security', 'confidenceThreshold', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Network */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Network className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Network</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Packet Capture</label>
              <input
                type="checkbox"
                checked={settings.network.packetCapture}
                onChange={(e) => handleSettingChange('network', 'packetCapture', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Deep Packet Inspection</label>
              <input
                type="checkbox"
                checked={settings.network.deepInspection}
                onChange={(e) => handleSettingChange('network', 'deepInspection', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Bandwidth Monitoring</label>
              <input
                type="checkbox"
                checked={settings.network.bandwidthMonitoring}
                onChange={(e) => handleSettingChange('network', 'bandwidthMonitoring', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Traffic Analysis</label>
              <input
                type="checkbox"
                checked={settings.network.trafficAnalysis}
                onChange={(e) => handleSettingChange('network', 'trafficAnalysis', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Log Retention (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.network.logRetention}
                onChange={(e) => handleSettingChange('network', 'logRetention', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* System */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">System</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Auto Updates</label>
              <input
                type="checkbox"
                checked={settings.system.autoUpdates}
                onChange={(e) => handleSettingChange('system', 'autoUpdates', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Backup Enabled</label>
              <input
                type="checkbox"
                checked={settings.system.backupEnabled}
                onChange={(e) => handleSettingChange('system', 'backupEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Performance Mode</label>
              <select
                value={settings.system.performanceMode}
                onChange={(e) => handleSettingChange('system', 'performanceMode', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                <option value="performance">Performance</option>
                <option value="balanced">Balanced</option>
                <option value="power-saving">Power Saving</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Log Level</label>
              <select
                value={settings.system.logLevel}
                onChange={(e) => handleSettingChange('system', 'logLevel', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">API Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">API Endpoint</label>
            <input
              type="text"
              value="https://api.aegisvault.com/v1"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">API Key</label>
            <input
              type="password"
              value="sk-1234567890abcdef"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;