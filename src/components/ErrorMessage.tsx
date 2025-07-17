import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-red-500/30 hover:bg-red-500/25 transition-all duration-300">
      <div className="flex items-center">
        <AlertCircle className="w-8 h-8 text-red-300 mr-4 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-red-200 font-semibold text-lg mb-1">Error</h3>
          <p className="text-red-100">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 text-red-200 hover:text-red-100 transition-colors duration-200 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;