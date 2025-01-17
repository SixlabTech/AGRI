'use client';

import { useState } from 'react';
import { capsules } from '@/lib/data/capsules';

export default function CapsulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'activity'>('name');

  // Filtrer et trier les capsules
  const filteredCapsules = capsules
    .filter(capsule => 
      capsule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capsule.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'activity') {
        return (b.lastActivity || '').localeCompare(a.lastActivity || '');
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-6">Capsules</h1>
        
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher des capsules..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-sm"
          />
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSortBy(sortBy === 'name' ? 'activity' : 'name')}
              className="text-sm text-gray-400 hover:text-white px-3 py-2"
            >
              {sortBy === 'name' ? 'Trier par nom' : 'Trier par activité'}
              <svg className="inline-block ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="bg-white text-black rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Créer une capsule
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCapsules.map(capsule => (
            <div key={capsule.id} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                </div>
                <div>
                  <h3 className="font-medium">{capsule.name}</h3>
                  <p className="text-sm text-gray-400">{capsule.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-400 gap-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${capsule.status === 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                  <span>{capsule.departments.length} départements</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
                    <path d="M19 11h-1.7c-.2-.6-.5-1.1-.8-1.6l1.2-1.2c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0l-1.2 1.2c-.5-.3-1-.6-1.6-.8V4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v1.7c-.6.2-1.1.5-1.6.8L5.3 5.3c-.4-.4-1-.4-1.4 0L2.5 6.7c-.4.4-.4 1 0 1.4l1.2 1.2c-.3.5-.6 1-.8 1.6H2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h1.7c.2.6.5 1.1.8 1.6l-1.2 1.2c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l1.2-1.2c.5.3 1 .6 1.6.8V20c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1.7c.6-.2 1.1-.5 1.6-.8l1.2 1.2c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4l-1.2-1.2c.3-.5.6-1 .8-1.6H19c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{capsule.visibility}</span>
                </div>
                <span className="ml-auto">{capsule.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
