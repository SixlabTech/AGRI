'use client';

import { useState } from 'react';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-10 px-6">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">Assistant IA Entreprise</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
          <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <User size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
