'use client';
import { useState, useEffect } from 'react';

export default function Alert({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md border ${alertStyles[type]} shadow-lg`}>
      <div className="flex items-center">
        <span className="mr-2">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose && onClose();
          }}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}