import React, { useState, useEffect } from 'react';
import { useConnections } from '@/hooks/useConnections';
import { CheckIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface SendConnectionRequestProps {
  recipientId: string;
  recipientName?: string;
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

const SendConnectionRequest: React.FC<SendConnectionRequestProps> = ({
  recipientId,
  recipientName = 'this user',
  buttonText = 'Connect',
  onSuccess,
  className = '',
}) => {
  const { sendRequest, checkConnectionStatus } = useConnections();
  const [connectionStatus, setConnectionStatus] = useState<string>('loading');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Check connection status on load
  useEffect(() => {
    const getStatus = async () => {
      const status = await checkConnectionStatus(recipientId);
      setConnectionStatus(status);
    };

    getStatus();
  }, [recipientId, checkConnectionStatus]);

  // Handle sending the connection request
  const handleSendRequest = async () => {
    if (!recipientId) return;
    
    setIsSending(true);
    try {
      const success = await sendRequest(recipientId, message);
      if (success) {
        setConnectionStatus('pending');
        setIsModalOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (connectionStatus === 'loading') {
    return (
      <button
        disabled
        className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-400 bg-gray-100 ${className}`}
      >
        <span className="animate-pulse">Loading...</span>
      </button>
    );
  }

  if (connectionStatus === 'accepted') {
    return (
      <button
        disabled
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 ${className}`}
      >
        <CheckIcon className="h-5 w-5 mr-2" />
        Connected
      </button>
    );
  }

  if (connectionStatus === 'pending') {
    return (
      <button
        disabled
        className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-600 bg-gray-50 ${className}`}
      >
        Request Pending
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      >
        <UserPlusIcon className="h-5 w-5 mr-2" />
        {buttonText}
      </button>

      {/* Connection Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div 
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Connect with {recipientName}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add a personal message to introduce yourself and explain why you&apos;d like to connect.
                    </p>
                    <textarea
                      rows={4}
                      className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md mt-3"
                      placeholder={`Hello, I'd like to connect with you...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSendRequest}
                  disabled={isSending}
                >
                  {isSending ? 'Sending...' : 'Send Request'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendConnectionRequest; 