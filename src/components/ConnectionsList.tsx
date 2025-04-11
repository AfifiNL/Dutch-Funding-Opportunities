import React from 'react';
import { useConnections } from '@/hooks/useConnections';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { UserMinusIcon } from '@heroicons/react/24/outline';

interface ConnectionsListProps {
  limit?: number;
  showRemoveButton?: boolean;
  emptyMessage?: string;
}

const ConnectionsList: React.FC<ConnectionsListProps> = ({
  limit,
  showRemoveButton = true,
  emptyMessage = 'No connections yet',
}) => {
  const { connections, removeConnection, loading } = useConnections();

  // Optionally limit the number of connections to display
  const displayConnections = limit ? connections.slice(0, limit) : connections;

  // Filter to only show accepted connections
  const acceptedConnections = displayConnections.filter(
    (connection) => connection.status === 'accepted'
  );

  // Format timestamp to relative time
  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

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

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My Connections</h2>
      
      {acceptedConnections.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {acceptedConnections.map((connection) => (
            <li key={connection.connection_id} className="py-4">
              <div className="flex items-center justify-between">
                <Link href={`/profile/${connection.connected_user_id}`} className="flex items-center group">
                  <div className="flex-shrink-0">
                    {connection.connected_user_avatar ? (
                      <Image
                        src={connection.connected_user_avatar}
                        alt={connection.connected_user_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-lg">
                          {connection.connected_user_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-800 group-hover:text-indigo-600">
                      {connection.connected_user_name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Connected {formatTime(connection.created_at)}
                    </p>
                  </div>
                </Link>
                
                {showRemoveButton && (
                  <button
                    onClick={() => removeConnection(connection.connection_id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                    title="Remove connection"
                  >
                    <UserMinusIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {limit && connections.length > limit && (
        <div className="mt-4 text-center">
          <Link 
            href="/connections" 
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all connections
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConnectionsList; 