import React from 'react';
import { useConnections } from '@/hooks/useConnections';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

const ConnectionRequests: React.FC = () => {
  const { pendingRequests, acceptRequest, rejectRequest, loading } = useConnections();

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Format timestamp to relative time
  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Connection Requests</h2>
      
      {pendingRequests.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No pending connection requests
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {pendingRequests.map((request) => (
            <li key={request.connection_id} className="py-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {request.connected_user_avatar ? (
                    <Image
                      src={request.connected_user_avatar}
                      alt={request.connected_user_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">
                        {request.connected_user_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-800">
                      {request.connected_user_name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(request.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Wants to connect with you
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => acceptRequest(request.connection_id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequest(request.connection_id)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConnectionRequests; 