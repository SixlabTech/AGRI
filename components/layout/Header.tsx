'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  // Définir le titre en fonction de la route active
  const getTitle = () => {
    switch (pathname) {
      case '/capsules':
        return 'Capsules';
      case '/chat':
        return 'Chat';
      case '/settings':
        return 'Paramètres';
      case '/access':
        return 'Gestion des Accès';
      default:
        return 'ITM AI';
    }
  };

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-white">{getTitle()}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button className="rounded-lg bg-gray-900 p-2 text-gray-400 hover:text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button className="h-8 w-8 rounded-full bg-gray-800" />
        </div>
      </div>
    </header>
  );
}
