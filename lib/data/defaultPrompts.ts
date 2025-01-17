export interface DefaultPrompt {
  id: string;
  text: string;
  capsuleId: string;
  departmentId: string;
  category?: string;
}

export const defaultPrompts: DefaultPrompt[] = [
  // ITM HR
  {
    id: "hr_1",
    text: "Quelles sont les étapes pour demander des congés ?",
    capsuleId: "itm-holding",
    departmentId: "itm-hr",
    category: "RH"
  },
  {
    id: "hr_2",
    text: "Comment puis-je consulter mon solde de congés ?",
    capsuleId: "itm-holding",
    departmentId: "itm-hr",
    category: "RH"
  },
  {
    id: "hr_3",
    text: "Comment optimiser le processus de recrutement ?",
    capsuleId: "itm-holding",
    departmentId: "itm-hr",
    category: "RH"
  },

  // ITM IT
  {
    id: "it_1",
    text: "Comment réinitialiser mon mot de passe ?",
    capsuleId: "itm-holding",
    departmentId: "itm-it",
    category: "IT"
  },
  {
    id: "it_2",
    text: "Comment accéder au VPN de l'entreprise ?",
    capsuleId: "itm-holding",
    departmentId: "itm-it",
    category: "IT"
  },
  {
    id: "it_3",
    text: "Problème de connexion à internet, quelle est la procédure ?",
    capsuleId: "itm-holding",
    departmentId: "itm-it",
    category: "IT"
  },

  // ITM PX (People Experience)
  {
    id: "px_1",
    text: "Comment améliorer la satisfaction client ?",
    capsuleId: "itm-holding",
    departmentId: "itm-px",
    category: "Experience Client"
  },
  {
    id: "px_2",
    text: "Quelles sont les meilleures pratiques pour la gestion des réclamations ?",
    capsuleId: "itm-holding",
    departmentId: "itm-px",
    category: "Experience Client"
  },
  {
    id: "px_3",
    text: "Comment optimiser le parcours client ?",
    capsuleId: "itm-holding",
    departmentId: "itm-px",
    category: "Experience Client"
  },

  // ITM Maintenance
  {
    id: "maint_1",
    text: "Quel est le planning de maintenance préventive ?",
    capsuleId: "itm-holding",
    departmentId: "itm-maintenance",
    category: "Maintenance"
  },
  {
    id: "maint_2",
    text: "Comment signaler un équipement défectueux ?",
    capsuleId: "itm-holding",
    departmentId: "itm-maintenance",
    category: "Maintenance"
  },
  {
    id: "maint_3",
    text: "Quelles sont les procédures d'urgence en cas de panne ?",
    capsuleId: "itm-holding",
    departmentId: "itm-maintenance",
    category: "Maintenance"
  },

  // ITM Environment
  {
    id: "env_1",
    text: "Quelles sont nos solutions de recyclage ?",
    capsuleId: "itm-holding",
    departmentId: "itm-environment",
    category: "Environnement"
  },
  {
    id: "env_2",
    text: "Comment réduire notre impact environnemental ?",
    capsuleId: "itm-holding",
    departmentId: "itm-environment",
    category: "Environnement"
  },
  {
    id: "env_3",
    text: "Quelles sont nos initiatives écologiques en cours ?",
    capsuleId: "itm-holding",
    departmentId: "itm-environment",
    category: "Environnement"
  },

  // IFS
  {
    id: "ifs_1",
    text: "Comment fonctionne Kitoko Pay ?",
    capsuleId: "itm-holding",
    departmentId: "ifs",
    category: "Services Financiers"
  },
  {
    id: "ifs_2",
    text: "Quelles sont les nouveautés des services financiers ?",
    capsuleId: "itm-holding",
    departmentId: "ifs",
    category: "Services Financiers"
  },
  {
    id: "ifs_3",
    text: "Comment intégrer nos solutions de paiement ?",
    capsuleId: "itm-holding",
    departmentId: "ifs",
    category: "Services Financiers"
  }
];
