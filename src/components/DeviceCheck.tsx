'use client';

import { useEffect, useState } from 'react';

export function DeviceCheck({ children }: { children: React.ReactNode }) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Check screen width (tablets are typically up to 1024px)
      const isSmallScreen = window.innerWidth < 1024;
      
      // Check if it's a touch device (mobile/tablet)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Consider it mobile/tablet if either condition is true
      setIsMobileOrTablet(isSmallScreen || isTouchDevice);
    };

    // Check on mount
    checkDevice();

    // Check on resize (in case user rotates device or resizes window)
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Show loading state briefly to avoid flash
  if (isMobileOrTablet === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Show message for mobile/tablet
  if (isMobileOrTablet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Desktop Game Only
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              WhoFits? is designed for laptop and desktop computers.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Please open this game on a laptop or PC for the best experience.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              The game requires a larger screen and precise mouse/trackpad controls for the drag-and-drop gameplay.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show game for desktop
  return <>{children}</>;
}

