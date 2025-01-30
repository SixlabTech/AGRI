'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationButton {
  href: string;
  icon: React.ReactElement;
  label: string;
  description: string;
  bgColor: string;
  badge?: string;
}

export default function HomePage() {
  
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const navigationButtons: NavigationButton[] = [
    {
      href: '/dashboard',
      icon: (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" 
        />
      ),
      label: 'Dashboard',
      description: 'Gérez les accès, les rôles et les permissions',
      bgColor: 'from-blue-600/20 to-blue-400/20',
      badge: 'Administration'
    },
    {
      href: '/chat',
      icon: (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" 
        />
      ),
      label: 'Chat',
      description: 'Interagissez avec l\'assistant IA',
      bgColor: 'from-blue-600/20 to-blue-400/20',
      badge: 'Assistant IA'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold text-blue-600 relative">
          Bienvenue sur{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 animate-gradient">
            ITM AI
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform scale-x-0 animate-expandLine" />
        </h1>
        <p className="text-gray-600 text-lg animate-fadeIn">
          Sélectionnez une option pour commencer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-4xl w-full">
        {navigationButtons.map((button, index) => (
          <Link 
            key={button.href} 
            href={button.href}
            onMouseEnter={() => setHoveredButton(button.href)}
            onMouseLeave={() => setHoveredButton(null)}
            className={`
              group relative
              flex flex-col items-center justify-center
              p-8 rounded-2xl
              bg-white shadow-lg
              hover:bg-blue-50
              transition-all duration-300 ease-in-out
              ${hoveredButton === button.href ? 'scale-105 shadow-xl shadow-blue-200' : 'scale-100'}
              border border-blue-100
              hover:border-blue-200
              animate-fadeSlideUp
            `}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Badge */}
            {button.badge && (
              <div className={`
                absolute -top-3 left-6
                px-3 py-1 rounded-full text-xs font-medium
                ${hoveredButton === button.href 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-600'}
                transition-colors duration-300
                border border-blue-200
              `}>
                {button.badge}
              </div>
            )}

            {/* Gradient background */}
            <div className={`
              absolute inset-0 rounded-2xl bg-gradient-to-br ${button.bgColor} opacity-0
              group-hover:opacity-100 transition-opacity duration-300
            `} />

            {/* Pulse effect on hover */}
            {hoveredButton === button.href && (
              <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-blue-200" />
            )}

            {/* Content */}
            <div className="relative space-y-6 text-center">
              <div className={`
                p-4 rounded-xl bg-white
                transform transition-transform duration-300
                ${hoveredButton === button.href ? 'scale-110' : 'scale-100'}
                group-hover:ring-2 ring-blue-200
              `}>
                <svg 
                  className={`
                    w-16 h-16 transition-all duration-300
                    ${hoveredButton === button.href ? 'text-blue-600' : 'text-blue-400'}
                  `} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor"
                >
                  {button.icon}
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className={`
                  text-2xl font-semibold transition-all duration-300
                  ${hoveredButton === button.href ? 'text-blue-600' : 'text-blue-500'}
                `}>
                  {button.label}
                </h2>
                <p className={`
                  text-sm transition-all duration-300
                  ${hoveredButton === button.href ? 'text-blue-600' : 'text-gray-600'}
                `}>
                  {button.description}
                </p>
              </div>

              <div className={`
                flex items-center justify-center gap-2
                text-sm font-medium
                ${hoveredButton === button.href ? 'text-blue-600' : 'text-blue-400'}
              `}>
                <span>Cliquez pour commencer</span>
                <svg 
                  className={`
                    w-4 h-4 transform transition-transform duration-300
                    ${hoveredButton === button.href ? 'translate-x-1' : ''}
                  `} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '600ms' }}>
        <p className="text-gray-500 text-sm">
          Version 1.0.0 • Développé par SixlabTech
        </p>
      </div>
    </div>
  );
}