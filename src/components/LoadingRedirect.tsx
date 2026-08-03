'use client';

import { useEffect, useState } from 'react';

interface LoadingRedirectProps {
  to: string;
  delay?: number;
  message?: string;
}

export default function LoadingRedirect({ to, delay = 1500, message = 'Redirecting...' }: LoadingRedirectProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = to;
    }, delay);

    const dotsTimer = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsTimer);
    };
  }, [to, delay]);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Loading message */}
        <p className="text-white text-lg font-medium mb-2">
          {message}{dots}
        </p>
        <p className="text-gray-500 text-sm">
          Taking you to the right page
        </p>
      </div>
    </div>
  );
}
