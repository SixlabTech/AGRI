'use client';

import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function FinanceDashboard() {
  const stats = {
    main: {
      value: '2.4M€',
      label: 'Chiffre d/affaires mensuel',
      trend: 8.7
    },
    secondary: [
      { value: '18%', label: 'Marge opérationnelle' },
      { value: '1.2M€', label: 'Trésorerie' },
      { value: '95%', label: 'Taux de recouvrement' }
    ],
    alerts: [
      { type: 'success', message: 'Objectifs trimestriels dépassés' },
      { type: 'warning', message: 'Révision budgétaire nécessaire' }
    ],
    recentActivity: [
      { action: 'Clôture mensuelle terminée', time: 'Il y a 1h' },
      { action: 'Nouveau rapport financier', time: 'Il y a 3h' }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Finance</h1>
        <p className="text-gray-600">Gestion financière et performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques principales */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Vue d'ensemble</h2>
            <div className="flex items-center gap-2">
              <TrendingUp 
                size={20} 
                className={stats.main.trend >= 0 ? 'text-green-500' : 'text-red-500'} 
              />
              <span className={`text-sm ${stats.main.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(stats.main.trend)}%
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold">{stats.main.value}</div>
            <div className="text-gray-500">{stats.main.label}</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.secondary.map((stat, index) => (
              <div key={index}>
                <div className="font-semibold">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes et activités */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Alertes et activités</h2>
          
          <div className="space-y-3 mb-6">
            {stats.alerts.map((alert, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  alert.type === 'warning' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'
                }`}
              >
                {alert.type === 'warning' ? (
                  <AlertTriangle size={18} />
                ) : (
                  <CheckCircle size={18} />
                )}
                {alert.message}
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Activité récente</h3>
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span>{activity.action}</span>
                  <span className="text-gray-400 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
