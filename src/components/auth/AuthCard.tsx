import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthCardProps {
  onSuccess?: () => void;
  defaultView?: 'login' | 'signup';
}

const AuthCard: React.FC<AuthCardProps> = ({ onSuccess, defaultView = 'login' }) => {
  const [isLoginView, setIsLoginView] = useState(defaultView === 'login');

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoginView ? (
        <LoginForm 
          onSuccess={onSuccess}
          onToggleForm={toggleView}
        />
      ) : (
        <SignupForm
          onSuccess={onSuccess}
          onToggleForm={toggleView}
        />
      )}
    </div>
  );
};

export default AuthCard;