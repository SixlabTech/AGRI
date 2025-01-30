'use client';

import { useState, useRef, useEffect, use } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface DepartmentInfo {
  title: string;
  description: string;
  suggestedQuestions: string[];
}

const departmentInfo: { [key: string]: DepartmentInfo } = {
  'ressources-humaines': {
    title: 'Ressources Humaines',
    description: 'Interrogez les données RH : effectifs, recrutements, formations, etc.',
    suggestedQuestions: [
      'Quel est le taux de turnover actuel ?',
      'Combien de recrutements ont été effectués ce trimestre ?',
      'Quelle est la répartition des employés par département ?'
    ]
  },
  'finance': {
    title: 'Finance',
    description: 'Analysez les données financières : chiffre d\'affaires, coûts, budgets, etc.',
    suggestedQuestions: [
      'Quel est le chiffre d\'affaires du dernier trimestre ?',
      'Quelles sont les principales sources de dépenses ?',
      'Quelle est la marge bénéficiaire par produit ?'
    ]
  },
  // Ajoutez d'autres départements selon vos besoins
};

export default function DepartmentChat({ params }: { params: Promise<{ department: string }> }) {
  const resolvedParams = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const department = departmentInfo[resolvedParams.department];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler une réponse de l'IA (à remplacer par votre véritable appel API)
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'Je recherche dans les données du département...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  if (!department) {
    return <div className="p-4">Département non trouvé</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* En-tête du département */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">{department.title}</h1>
        <p className="text-gray-600 mt-1">{department.description}</p>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center space-y-4">
            <Bot size={48} className="mx-auto text-gray-400" />
            <h2 className="text-xl font-semibold">Assistant IA - {department.title}</h2>
            <p className="text-gray-600">Questions suggérées :</p>
            <div className="space-y-2">
              {department.suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="block w-full p-2 text-left border rounded-lg hover:bg-gray-50"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-gray-100'
                  : 'bg-black text-white'
              }`}
            >
              {message.content}
              <div className={`text-xs mt-1 ${
                message.role === 'assistant' ? 'text-gray-500' : 'text-gray-300'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              L'assistant écrit...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Posez une question sur ${department.title}...`}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
