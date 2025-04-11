import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { Database } from '@/types/supabase';

export default function DatabaseDebugger() {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [tableChecks, setTableChecks] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>('profiles');
  const [queryLimit, setQueryLimit] = useState<number>(5);

  // Tables to check - these must match the actual table names in the schema
  const tablesToCheck = [
    'profiles',
    'investor_profiles',
    'funding_opportunities',
    'investor_opportunity_links'
  ] as const;

  const checkDatabase = useCallback(async () => {
    setConnectionStatus('loading');
    try {
      // Test connection
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) throw error;
      
      setConnectionStatus('success');
      
      // Check tables
      const tableStatus: Record<string, boolean> = {};
      
      // Check each table
      for (const table of tablesToCheck) {
        try {
          const { error } = await supabase.from(table).select('count').limit(1);
          tableStatus[table] = !error;
        } catch {
          tableStatus[table] = false;
        }
      }
      
      setTableChecks(tableStatus);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  }, []);

  useEffect(() => {
    checkDatabase();
  }, [checkDatabase]);

  const runQuery = async () => {
    if (!selectedTable) return;
    
    setIsQuerying(true);
    setQueryResults(null);
    setQueryError(null);
    
    try {
      const { data, error } = await supabase
        .from(selectedTable as any)
        .select('*')
        .limit(queryLimit);
        
      if (error) throw error;
      
      setQueryResults(data);
    } catch (error) {
      setQueryError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsQuerying(false);
    }
  };

  // Display connection status badge
  const renderStatusBadge = () => {
    switch (connectionStatus) {
      case 'idle':
        return <div className="px-2 py-1 text-xs bg-gray-500 text-white rounded-md">Not Connected</div>;
      case 'loading':
        return <div className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md">Connecting...</div>;
      case 'success':
        return <div className="px-2 py-1 text-xs bg-green-500 text-white rounded-md">Connected</div>;
      case 'error':
        return <div className="px-2 py-1 text-xs bg-red-500 text-white rounded-md">Connection Failed</div>;
      default:
        return null;
    }
  };

  if (!isExpanded) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white cursor-pointer shadow-lg z-50 hover:bg-gray-700 transition-colors duration-200"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'error' ? 'bg-red-500 animate-pulse' : 
            connectionStatus === 'success' ? 'bg-green-500' : 
            connectionStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'
          }`}></div>
          <span className="text-sm font-medium">Database Status</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white shadow-lg z-50 max-w-md w-full max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Database Debugger {renderStatusBadge()}
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => checkDatabase()} 
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
            aria-label="Refresh database status"
            title="Refresh"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
            aria-label="Minimize database debugger"
            title="Minimize"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {lastChecked && (
        <div className="text-xs text-gray-400 mb-3">
          Last checked: {lastChecked}
        </div>
      )}
      
      <div className="grid gap-4">
        <div className="bg-gray-700 rounded-md p-3">
          <div className="font-medium mb-2">Database Connection Status</div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Supabase:</span>
            {renderStatusBadge()}
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-md p-3">
          <div className="font-medium mb-2">Table Availability</div>
          <div className="grid gap-2">
            {tablesToCheck.map(table => (
              <div key={table} className="flex items-center justify-between py-1 text-sm">
                <span>{table}:</span>
                {connectionStatus === 'success' ? (
                  <div className={`px-2 py-1 text-xs ${tableChecks[table] ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
                    {tableChecks[table] ? 'Available' : 'Not Available'}
                  </div>
                ) : (
                  <div className="px-2 py-1 text-xs bg-gray-500 text-white rounded-md">Not Checked</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Query Section */}
        <div className="bg-gray-700 rounded-md p-3">
          <div className="font-medium mb-2">Run Quick Query</div>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="table-select" className="text-sm">Table:</label>
              <select
                id="table-select"
                className="text-sm bg-gray-800 border border-gray-600 rounded px-2 py-1 flex-grow"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              >
                {tablesToCheck.map(table => (
                  <option key={table} value={table}>{table}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="limit-input" className="text-sm">Limit:</label>
              <input
                id="limit-input"
                type="number"
                min="1"
                max="50"
                className="text-sm bg-gray-800 border border-gray-600 rounded px-2 py-1 w-16"
                value={queryLimit}
                onChange={(e) => setQueryLimit(Number(e.target.value))}
              />
              
              <button
                onClick={runQuery}
                disabled={isQuerying || connectionStatus !== 'success'}
                className={`ml-auto px-3 py-1 text-sm rounded ${
                  connectionStatus !== 'success' 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : isQuerying 
                      ? 'bg-yellow-600 text-white cursor-wait' 
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                }`}
              >
                {isQuerying ? 'Running...' : 'Run Query'}
              </button>
            </div>
            
            {queryError && (
              <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-md p-2 mt-1">
                <p className="text-red-300 text-xs">{queryError}</p>
              </div>
            )}
            
            {queryResults && (
              <div className="mt-2">
                <div className="font-medium text-sm mb-1">Results ({queryResults.length}):</div>
                <div className="bg-gray-800 rounded-md p-2 max-h-48 overflow-auto">
                  {queryResults.length === 0 ? (
                    <div className="text-gray-400 text-sm">No results found</div>
                  ) : (
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                      {JSON.stringify(queryResults, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {errorMessage && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-md p-3 mt-2">
            <div className="font-medium text-red-300 mb-1">Error Details:</div>
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
} 