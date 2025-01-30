'use client';

import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function RHDashboard() {
  const stats = {
    main: { 
      value: '1,234', 
      label: 'Employés actifs',
      trend: 5.2
    },
    secondary: [
      { value: '45', label: 'Recrutements en cours' },
      { value: '92%', label: 'Taux de rétention' },
      { value: '24', label: 'Formations planifiées' }
    ],
    alerts: [
      { type: 'warning', message: '3 postes critiques à pourvoir' },
      { type: 'success', message: 'Objectifs de formation atteints' }
    ],
    recentActivity: [
      { action: 'Nouveau processus de recrutement IT', time: 'Il y a 2h' },
      { action: 'Mise à jour du plan de formation', time: 'Il y a 4h' }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ressources Humaines</h1>
        <p className="text-gray-600">Gestion des effectifs et du capital humain</p>
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
