'use client';

import { useState } from 'react';
import { capsules } from '@/lib/data/capsules';

interface Role {
  id: string;
  name: string;
  department: string;
  permissions: string[];
  capsuleId: string;
}

export default function AccessPage() {
  const [selectedCapsule, setSelectedCapsule] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const [roles] = useState<Role[]>([
    // ITM Holding Roles
    {
      id: 'hr-1',
      name: 'Responsable Formation RH',
      department: 'itm-hr',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'formation', 'gestion-talents']
    },
    {
      id: 'px-1',
      name: 'Manager Centre Contact',
      department: 'itm-px',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'gestion-qualité', 'formation']
    },
    {
      id: 'maintenance-1',
      name: 'Technicien Maintenance',
      department: 'itm-maintenance',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'maintenance', 'formation-site']
    },
    {
      id: 'env-1',
      name: 'Responsable Environnement',
      department: 'itm-environment',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'gestion-déchets', 'recyclage']
    },
    {
      id: 'ifs-1',
      name: 'Gestionnaire Fintech',
      department: 'ifs',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'transactions', 'gestion-paie']
    },
    {
      id: 'geo-1',
      name: 'Ingénieur Mines',
      department: 'geo-international',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'installation', 'gestion-eau', 'approvisionnement']
    },
    {
      id: 'vendis-1',
      name: 'Responsable E-commerce',
      department: 'vendis',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'gestion-ventes', 'marketing']
    },
    {
      id: 'jamon-1',
      name: 'Responsable Logistique',
      department: 'jamon',
      capsuleId: 'itm-holding',
      permissions: ['lecture', 'écriture', 'gestion-flotte', 'transport']
    },
    // Autres rôles existants
    {
      id: '1',
      name: 'Recruteur Senior',
      department: 'recrutement',
      capsuleId: 'itm-benin',
      permissions: ['lecture', 'écriture', 'suppression']
    },
    {
      id: '2',
      name: 'Agent Commercial',
      department: 'commercial',
      capsuleId: 'itm-benin',
      permissions: ['lecture', 'écriture', 'facturation']
    },
    {
      id: '3',
      name: 'Développeur Senior',
      department: 'dev',
      capsuleId: 'itm-tech',
      permissions: ['lecture', 'écriture', 'déploiement']
    },
    {
      id: '4',
      name: 'Responsable Finance',
      department: 'finance',
      capsuleId: 'itm-sarl',
      permissions: ['lecture', 'écriture', 'validation']
    }
  ]);

  // Filtrer les rôles en fonction de la capsule et du département sélectionnés
  const filteredRoles = roles.filter(role => {
    if (!selectedCapsule) return true;
    if (!selectedDepartment) return role.capsuleId === selectedCapsule;
    return role.capsuleId === selectedCapsule && role.department === selectedDepartment;
  });

  // Obtenir les départements de la capsule sélectionnée
  const currentDepartments = selectedCapsule
    ? capsules.find(c => c.id === selectedCapsule)?.departments || []
    : [];

  return (
    <div className="flex flex-col h-full bg-black text-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Gestion des Accès</h2>
        <div className="flex gap-4 mb-6">
          <select
            value={selectedCapsule}
            onChange={(e) => {
              setSelectedCapsule(e.target.value);
              setSelectedDepartment(''); // Réinitialiser le département sélectionné
            }}
            className="bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
          >
            <option value="">Toutes les capsules</option>
            {capsules.map(capsule => (
              <option key={capsule.id} value={capsule.id}>
                {capsule.name}
              </option>
            ))}
          </select>

          {selectedCapsule && (
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <option value="">Tous les pôles</option>
              {currentDepartments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map(role => {
          const capsule = capsules.find(c => c.id === role.capsuleId);
          const department = capsule?.departments.find(d => d.id === role.department);
          
          return (
            <div
              key={role.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex flex-col gap-2 mb-3">
                <h3 className="font-medium">{role.name}</h3>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-600 rounded-full">
                    {capsule?.name}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                    {department?.name}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Permissions:</div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map(permission => (
                    <span
                      key={permission}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
