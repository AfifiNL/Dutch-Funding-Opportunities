import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSuccess, onCancel }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Basic validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }

    try {
      setIsLoading(true);
      const success = await resetPassword(email);
      
      if (!success) {
        setFormError('Failed to send reset instructions. Please try again.');
        return;
      }
      
      setIsSubmitted(true);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      
      {isSubmitted ? (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
          <p>Password reset instructions have been sent to your email.</p>
          <p className="mt-2 text-sm">Please check your inbox and follow the link to reset your password.</p>
          <button
            onClick={onCancel}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordResetForm; 