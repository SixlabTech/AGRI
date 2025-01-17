export interface Department {
  id: string;
  name: string;
}

export interface Capsule {
  id: string;
  name: string;
  description: string;
  departments: Department[];
  items?: number;
  status?: 'active' | 'inactive';
  visibility?: 'private' | 'public';
  lastActivity?: string;
}

export const capsules: Capsule[] = [
  {
    id: 'itm-holding',
    name: 'ITM Holding',
    description: 'Groupe principal regroupant tous les services ITM',
    departments: [
      { id: 'itm-hr', name: 'ITM HR' },
      { id: 'itm-px', name: 'ITM People Xperience' },
      { id: 'itm-maintenance', name: 'ITM Maintenance' },
      { id: 'itm-environment', name: 'ITM Environment' },
      { id: 'ifs', name: 'IFS (Innovative Financial Services)' },
      { id: 'geo-international', name: 'GEO International' },
      { id: 'vendis', name: 'VENDIS' },
      { id: 'jamon', name: 'JAMON' }
    ],
    items: 8,
    status: 'active',
    visibility: 'private',
    lastActivity: 'today'
  },
  {
    id: 'itm-benin',
    name: 'ITM Benin',
    description: 'Filiale béninoise spécialisée en recrutement',
    departments: [
      { id: 'recrutement', name: 'Recrutement' },
      { id: 'commercial', name: 'Commercial' },
      { id: 'rh', name: 'Ressources Humaines' },
      { id: 'it', name: 'IT' }
    ],
    items: 4,
    status: 'active',
    visibility: 'private',
    lastActivity: 'yesterday'
  },
  {
    id: 'itm-sarl',
    name: 'ITM SARL',
    description: 'Entité principale avec services financiers',
    departments: [
      { id: 'finance', name: 'Finance' },
      { id: 'commercial', name: 'Commercial' },
      { id: 'it', name: 'IT' }
    ],
    items: 3,
    status: 'active',
    visibility: 'private',
    lastActivity: 'this week'
  },
  {
    id: 'itm-tech',
    name: 'ITM Tech',
    description: 'Division technologique et innovation',
    departments: [
      { id: 'dev', name: 'Développement' },
      { id: 'design', name: 'Design' },
      { id: 'it', name: 'IT' }
    ],
    items: 3,
    status: 'active',
    visibility: 'private',
    lastActivity: 'this week'
  }
];
