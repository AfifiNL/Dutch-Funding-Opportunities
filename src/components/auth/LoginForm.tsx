import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PasswordResetForm from './PasswordResetForm';

interface LoginFormProps {
  onSuccess?: () => void;
  onToggleForm?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onToggleForm }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Basic validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) {
        setFormError(error.message);
        return;
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPasswordReset = () => {
    setShowPasswordReset(true);
  };

  const handleCancelPasswordReset = () => {
    setShowPasswordReset(false);
  };

  if (showPasswordReset) {
    return <PasswordResetForm onCancel={handleCancelPasswordReset} />;
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
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
            placeholder="Email address"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
          />
          <div className="flex justify-end mt-1">
            <button
              type="button"
              className="text-xs text-blue-500 hover:text-blue-700"
              onClick={handleShowPasswordReset}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;