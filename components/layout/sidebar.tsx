"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Building2,
  Brain,
  BarChart3,
  Settings,
  Menu,
  Globe,
  ChevronDown,
  Building,
  Filter,
  Briefcase,
  FileText,
  ShoppingCart,
  Truck,
  Package,
  Warehouse,
  UserCog,
  BookOpen,
  Calculator,
  CreditCard,
  PieChart,
  TrendingUp,
  Mail,
  Share2,
  Target,
  Users2,
  Phone,
  HelpCircle,
  Bell,
  MessageSquare,
  Calendar,
  ClipboardList,
  FileSearch
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: any;
  path: string;
  description?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Vue d'ensemble",
    icon: PieChart,
    path: "/dashboard",
    description: "Tableau de bord général"
  },
  {
    name: "Ressources Humaines",
    icon: Users,
    path: "/dashboard/rh",
    description: "Gestion RH",
    subItems: [
      { name: "Employés", icon: Users2, path: "/dashboard/rh/employes" },
      { name: "Recrutement", icon: Briefcase, path: "/dashboard/rh/recrutement" },
      { name: "Formation", icon: BookOpen, path: "/dashboard/rh/formation" },
      { name: "Paie", icon: CreditCard, path: "/dashboard/rh/paie" },
      { name: "Présence", icon: Calendar, path: "/dashboard/rh/presence" }
    ]
  },
  {
    name: "Finance",
    icon: BarChart3,
    path: "/dashboard/finance",
    description: "Gestion financière",
    subItems: [
      { name: "Comptabilité", icon: Calculator, path: "/dashboard/finance/comptabilite" },
      { name: "Facturation", icon: FileText, path: "/dashboard/finance/facturation" },
      { name: "Trésorerie", icon: CreditCard, path: "/dashboard/finance/tresorerie" },
      { name: "Rapports", icon: TrendingUp, path: "/dashboard/finance/rapports" }
    ]
  },
  {
    name: "Commercial",
    icon: ShoppingCart,
    path: "/dashboard/commercial",
    description: "Gestion commerciale",
    subItems: [
      { name: "Ventes", icon: TrendingUp, path: "/dashboard/commercial/ventes" },
      { name: "Clients", icon: Users, path: "/dashboard/commercial/clients" },
      { name: "Devis", icon: FileText, path: "/dashboard/commercial/devis" },
      { name: "Contrats", icon: FileSearch, path: "/dashboard/commercial/contrats" }
    ]
  },
  {
    name: 'Production',
    icon: Brain,
    path: '/dashboard/production',
    description: 'Gestion de production',
    subItems: [
      { name: 'Planning', icon: Calendar, path: '/dashboard/production/planning' },
      { name: 'Stock', icon: Package, path: '/dashboard/production/stock' },
      { name: 'Qualité', icon: ClipboardList, path: '/dashboard/production/qualite' },
      { name: 'Maintenance', icon: Settings, path: '/dashboard/production/maintenance' }
    ]
  },
  {
    name: 'Logistique',
    icon: Truck,
    path: '/dashboard/logistique',
    description: 'Gestion logistique',
    subItems: [
      { name: 'Expéditions', icon: Truck, path: '/dashboard/logistique/expeditions' },
      { name: 'Entrepôts', icon: Warehouse, path: '/dashboard/logistique/entrepots' },
      { name: 'Fournisseurs', icon: Building, path: '/dashboard/logistique/fournisseurs' },
      { name: 'Inventaire', icon: ClipboardList, path: '/dashboard/logistique/inventaire' }
    ]
  },
  {
    name: 'Marketing',
    icon: Target,
    path: '/dashboard/marketing',
    description: 'Marketing et communication',
    subItems: [
      { name: 'Campagnes', icon: Share2, path: '/dashboard/marketing/campagnes' },
      { name: 'Emailing', icon: Mail, path: '/dashboard/marketing/emailing' },
      { name: 'Réseaux sociaux', icon: Share2, path: '/dashboard/marketing/social' },
      { name: 'Analyses', icon: PieChart, path: '/dashboard/marketing/analyses' }
    ]
  },
  {
    name: 'Support',
    icon: HelpCircle,
    path: '/dashboard/support',
    description: 'Service client',
    subItems: [
      { name: 'Tickets', icon: MessageSquare, path: '/dashboard/support/tickets' },
      { name: 'Base de connaissances', icon: BookOpen, path: '/dashboard/support/kb' },
      { name: 'Centre d\'appels', icon: Phone, path: '/dashboard/support/calls' }
    ]
  },
  {
    name: 'IT',
    icon: Settings,
    path: '/dashboard/it',
    description: 'Système et maintenance',
    subItems: [
      { name: 'Infrastructure', icon: Building2, path: '/dashboard/it/infrastructure' },
      { name: 'Sécurité', icon: UserCog, path: '/dashboard/it/securite' },
      { name: 'Maintenance', icon: Settings, path: '/dashboard/it/maintenance' }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [notifications] = useState(3); // Exemple de notifications

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <div 
      className={`
        ${isOpen ? 'w-72' : 'w-20'} 
        bg-gradient-to-b from-gray-900 to-black
        text-white border-r border-gray-800/50 
        transition-all duration-300 h-screen 
        fixed left-0 top-0 flex flex-col
        shadow-xl backdrop-blur-sm
        z-50 overflow-hidden
      `}
    >
      {/* Header avec logo et nom */}
      <div className="p-6 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg">
            <span className="font-bold text-lg">IA</span>
          </div>
          {isOpen && (
            <div className="font-semibold text-xl bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              ITM-AI
            </div>
          )}
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {menuItems.map((item) => (
          <div key={item.path} className="group">
            <button
              onClick={() => item.subItems && toggleExpand(item.path)}
              className={`
                w-full flex items-center p-3 rounded-xl
                transition-all duration-200
                ${!isOpen ? 'justify-center' : ''}
                ${pathname === item.path ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'}
              `}
            >
              <div className={`
                ${isOpen ? 'min-w-[2.5rem]' : 'w-10'} h-10 rounded-lg
                flex items-center justify-center
                ${pathname === item.path ? 'bg-blue-500/20' : 'bg-gray-800/30 group-hover:bg-gray-800/50'}
                transition-colors
              `}>
                <item.icon size={20} className={pathname === item.path ? 'text-blue-400' : ''} />
              </div>
              {isOpen && (
                <div className="ml-3 flex-1 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400">{item.description}</div>
                    )}
                  </div>
                  {item.subItems && (
                    <ChevronDown
                      size={16}
                      className={`
                        transform transition-transform text-gray-400
                        ${expandedItems.includes(item.path) ? 'rotate-180' : ''}
                      `}
                    />
                  )}
                </div>
              )}
            </button>

            {/* Sous-menus avec animation */}
            {isOpen && item.subItems && expandedItems.includes(item.path) && (
              <div className="mt-2 ml-4 space-y-1 animate-fadeIn overflow-hidden transition-all duration-300 ease-in-out">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className={`
                      flex items-center p-3 rounded-lg
                      transition-all duration-200
                      ${pathname === subItem.path ? 
                        "bg-blue-500/10 text-blue-400" : 
                        "text-gray-400 hover:bg-gray-800/30 hover:text-white"
                      }
                    `}
                  >
                    <subItem.icon size={16} />
                    <span className="ml-3 text-sm">{subItem.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer avec notifications, paramètres et statut */}
      <div className={`${isOpen ? 'px-6' : 'px-4'} py-4 border-t border-gray-700/50 space-y-3`}>
        {/* Notifications */}
        <div className={`
          flex items-center ${isOpen ? 'justify-between' : 'justify-center'}
          bg-gray-800/30 p-3 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer
        `}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Bell size={18} className="text-blue-400" />
            </div>
            {isOpen && (
              <span className="text-sm font-medium text-gray-200">Notifications</span>
            )}
          </div>
          {isOpen && notifications > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-lg font-medium">
              {notifications}
            </span>
          )}
        </div>

        {/* Paramètres */}
        <div className={`
          flex items-center ${isOpen ? 'justify-between' : 'justify-center'}
          bg-gray-800/30 p-3 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer
        `}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Settings size={18} className="text-purple-400" />
            </div>
            {isOpen && (
              <span className="text-sm font-medium text-gray-200">Paramètres</span>
            )}
          </div>
        </div>

        {/* Statut du système */}
        <div className={`
          flex items-center ${isOpen ? 'gap-3' : 'justify-center'}
          bg-gray-800/30 p-3 rounded-xl
        `}>
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          {isOpen && (
            <div>
              <div className="text-sm font-medium text-gray-300">Système actif</div>
              <div className="text-xs text-gray-500">v1.0.0</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
