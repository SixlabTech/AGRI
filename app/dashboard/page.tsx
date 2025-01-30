'use client';

import { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Building2, 
  Brain, 
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface DepartmentSummary {
  id: string;
  name: string;
  icon: any;
  stats: {
    main: { value: string; label: string; trend: number };
    secondary: { value: string; label: string }[];
  };
  alerts: { type: 'warning' | 'success'; message: string }[];
  recentActivity: { action: string; time: string }[];
}

const departmentSummaries: DepartmentSummary[] = [
  {
    id: 'rh',
    name: 'Ressources Humaines',
    icon: Users,
    stats: {
      main: { 
        value: '1,234', 
        label: 'Employés actifs',
        trend: 5.2
      },
      secondary: [
        { value: '45', label: 'Recrutements en cours' },
        { value: '92%', label: 'Taux de rétention' },
        { value: '24', label: 'Formations planifiées' }
      ]
    },
    alerts: [
      { type: 'warning', message: '3 postes critiques à pourvoir' },
      { type: 'success', message: 'Objectifs de formation atteints' }
    ],
    recentActivity: [
      { action: 'Nouveau processus de recrutement IT', time: 'Il y a 2h' },
      { action: 'Mise à jour du plan de formation', time: 'Il y a 4h' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: BarChart3,
    stats: {
      main: {
        value: '2.4M€',
        label: 'Chiffre d\'affaires mensuel',
        trend: 8.7
      },
      secondary: [
        { value: '18%', label: 'Marge opérationnelle' },
        { value: '1.2M€', label: 'Trésorerie' },
        { value: '95%', label: 'Taux de recouvrement' }
      ]
    },
    alerts: [
      { type: 'success', message: 'Objectifs trimestriels dépassés' },
      { type: 'warning', message: 'Révision budgétaire nécessaire' }
    ],
    recentActivity: [
      { action: 'Clôture mensuelle terminée', time: 'Il y a 1h' },
      { action: 'Nouveau rapport financier', time: 'Il y a 3h' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Building2,
    stats: {
      main: {
        value: '45K',
        label: 'Visiteurs mensuels',
        trend: 12.3
      },
      secondary: [
        { value: '4.2%', label: 'Taux de conversion' },
        { value: '28K', label: 'Leads actifs' },
        { value: '15', label: 'Campagnes en cours' }
      ]
    },
    alerts: [
      { type: 'success', message: 'Campagne Q1 performante' },
      { type: 'warning', message: 'Optimisation SEO recommandée' }
    ],
    recentActivity: [
      { action: 'Lancement campagne réseaux sociaux', time: 'Il y a 30min' },
      { action: 'Mise à jour site web', time: 'Il y a 5h' }
    ]
  },
  {
    id: 'production',
    name: 'Production',
    icon: Brain,
    stats: {
      main: {
        value: '98.5%',
        label: 'Taux de production',
        trend: -1.2
      },
      secondary: [
        { value: '1.2%', label: 'Taux de défauts' },
        { value: '85%', label: 'Utilisation machines' },
        { value: '4h', label: 'Temps moyen maintenance' }
      ]
    },
    alerts: [
      { type: 'warning', message: 'Maintenance préventive requise' },
      { type: 'success', message: 'Objectifs qualité atteints' }
    ],
    recentActivity: [
      { action: 'Mise à jour planning production', time: 'Il y a 1h' },
      { action: 'Contrôle qualité effectué', time: 'Il y a 2h' }
    ]
  },
  {
    id: 'it',
    name: 'IT',
    icon: Settings,
    stats: {
      main: {
        value: '99.9%',
        label: 'Disponibilité systèmes',
        trend: 0.1
      },
      secondary: [
        { value: '12', label: 'Tickets en cours' },
        { value: '4', label: 'Projets majeurs' },
        { value: '15min', label: 'Temps réponse moyen' }
      ]
    },
    alerts: [
      { type: 'success', message: 'Tous les systèmes opérationnels' },
      { type: 'warning', message: 'Mise à jour sécurité requise' }
    ],
    recentActivity: [
      { action: 'Déploiement mise à jour', time: 'Il y a 15min' },
      { action: 'Sauvegarde système', time: 'Il y a 1h' }
    ]
  }
];

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vue d'ensemble des services</h1>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
          <option value="ytd">Année en cours</option>
        </select>
      </div>

      {/* Grille des départements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentSummaries.map((dept) => (
          <div key={dept.id} className="bg-white rounded-xl shadow-sm border p-6">
            {/* En-tête du département */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <dept.icon size={24} className="text-gray-700" />
                </div>
                <h2 className="text-lg font-semibold">{dept.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp 
                  size={20} 
                  className={dept.stats.main.trend >= 0 ? 'text-green-500' : 'text-red-500'} 
                />
                <span className={`text-sm ${dept.stats.main.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(dept.stats.main.trend)}%
                </span>
              </div>
            </div>

            {/* Statistique principale */}
            <div className="mb-4">
              <div className="text-2xl font-bold">{dept.stats.main.value}</div>
              <div className="text-gray-500 text-sm">{dept.stats.main.label}</div>
            </div>

            {/* Statistiques secondaires */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {dept.stats.secondary.map((stat, index) => (
                <div key={index}>
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Alertes */}
            <div className="space-y-2 mb-4">
              {dept.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                    alert.type === 'warning' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {alert.type === 'warning' ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  {alert.message}
                </div>
              ))}
            </div>

            {/* Activité récente */}
            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Activité récente</div>
              <div className="space-y-2">
                {dept.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-gray-400" />
                    <span>{activity.action}</span>
                    <span className="text-gray-400 text-xs ml-auto">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
