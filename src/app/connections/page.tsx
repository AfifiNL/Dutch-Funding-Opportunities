'use client';

import React, { useState } from 'react';
import ConnectionsList from '@/components/ConnectionsList';
import ConnectionRequests from '@/components/ConnectionRequests';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const ConnectionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connections');

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs navigation */}
          <div className="md:w-1/4">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('connections')}
                  className={`px-4 py-3 text-left transition-colors ${
                    activeTab === 'connections'
                      ? 'bg-teal-900/30 text-teal-400 border-l-2 border-teal-400'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  My Connections
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-4 py-3 text-left transition-colors ${
                    activeTab === 'requests'
                      ? 'bg-teal-900/30 text-teal-400 border-l-2 border-teal-400'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Connection Requests
                </button>
              </nav>
            </div>
          </div>

          {/* Tab content */}
          <div className="md:w-3/4">
            {activeTab === 'connections' ? (
              <ConnectionsList />
            ) : (
              <ConnectionRequests />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ConnectionsPage; 