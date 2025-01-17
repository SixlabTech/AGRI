'use client';

import React, { useState, useEffect } from 'react';
import { capsules } from '@/lib/data/capsules';
import { defaultPrompts} from '@/lib/data/defaultPrompts';
import { PlusCircle, Send } from 'lucide-react';
import { usePromptAnimation } from '@/hooks/usePromptAnimation';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  entities: string[];
}

interface Entity {
  id: string;
  name: string;
}

interface DefaultPrompt {
  id: string;
  text: string;
  capsuleId: string;
  departmentId: string;
  category?: string;
}

export default function ChatPage() {
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isEntitiesMenuOpen, setIsEntitiesMenuOpen] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [currentPromptPair, setCurrentPromptPair] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const resetConversation = () => {
    setMessages([]);
    setInputMessage('');
  };

  const entities: Entity[] = capsules.map(capsule => ({
    id: capsule.id,
    name: capsule.name
  }));

  const models = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'Deepseek', name: 'Deepseek v3' },
    { id: 'gpt-3.5', name: 'GPT-3.5' },
    { id: 'claude-2', name: 'Claude-2' },
    { id: 'ItmPro', name: 'ItmPro V1' }
  ];

  const toggleEntity = (entityId: string) => {
    setSelectedEntities(prev => 
      prev.includes(entityId) 
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const handleDefaultPrompt = (prompt: DefaultPrompt) => {
    if (!selectedEntities.includes(prompt.capsuleId)) {
      setSelectedEntities([prompt.capsuleId]);
    }
    setInputMessage(prompt.text);
    sendMessage(prompt.text);
  };

  const sendMessage = (text: string = inputMessage) => {
    if (!text.trim() || selectedEntities.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
      entities: selectedEntities,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    // Simuler une réponse contextuelle de l'IA
    setTimeout(() => {
      let aiResponseContent = '';
      const selectedCapsule = capsules.find(c => c.id === selectedEntities[0]);
      
      if (text.toLowerCase().includes('congés') || text.toLowerCase().includes('vacances')) {
        aiResponseContent = "Pour poser des congés, vous devez suivre ces étapes :\n1. Connectez-vous à votre espace RH\n2. Cliquez sur 'Demande de congés'\n3. Sélectionnez les dates souhaitées\n4. Attendez la validation de votre responsable";
      } else if (text.toLowerCase().includes('salaire') || text.toLowerCase().includes('paie')) {
        aiResponseContent = "Vos bulletins de salaire sont disponibles dans votre espace RH. La paie est versée le 25 de chaque mois. Pour toute question spécifique, contactez le service RH.";
      } else if (text.toLowerCase().includes('formation')) {
        aiResponseContent = "ITM propose plusieurs types de formations :\n- Formations techniques\n- Formations management\n- Formations soft skills\nContactez votre responsable ou le service RH pour en savoir plus.";
      } else {
        aiResponseContent = `Je suis votre assistant ${selectedCapsule?.name || 'ITM'}. Je peux vous aider avec toutes vos questions concernant ${selectedCapsule?.description || 'les services ITM'}. Comment puis-je vous aider ?`;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: 'ai',
        timestamp: new Date(),
        entities: selectedEntities,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const startNewConversation = () => {
    setMessages([]);
    setInputMessage('');
    setSelectedEntities([]);
    setShowPrompts(true);
  };

  useEffect(() => {
    if (!showPrompts) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPromptPair((prev) => {
          const filteredPrompts = defaultPrompts.filter(prompt => 
            selectedEntities.includes(prompt.capsuleId)
          );
          const maxPairs = Math.floor(filteredPrompts.length / 2);
          return prev + 1 >= maxPairs ? 0 : prev + 1;
        });
        setIsAnimating(false);
      }, 800);
    }, 5000);

    return () => clearInterval(timer);
  }, [showPrompts, selectedEntities]);

  const wrapperStyles = usePromptAnimation(0).wrapperClassName;
  const firstPromptStyles = usePromptAnimation(0);
  const secondPromptStyles = usePromptAnimation(1);

  return (
    <div className="flex h-full bg-black">
      <div className="flex flex-col flex-1">
        {/* En-tête avec sélection */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-800">
          <div className="flex-1 max-w-xs relative">
            <button
              onClick={() => setIsEntitiesMenuOpen(!isEntitiesMenuOpen)}
              className="w-full flex items-center justify-between bg-gray-900 text-white border border-gray-800 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <span className="truncate">
                {selectedEntities.length === 0
                  ? "Sélectionner des capsules"
                  : `${selectedEntities.length} capsule${selectedEntities.length > 1 ? 's' : ''} sélectionnée${selectedEntities.length > 1 ? 's' : ''}`}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${isEntitiesMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isEntitiesMenuOpen && (
              <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-800 rounded-md shadow-lg">
                {entities.map((entity) => (
                  <label
                    key={entity.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEntities.includes(entity.id)}
                      onChange={() => toggleEntity(entity.id)}
                      className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-0"
                    />
                    <span className="ml-2 text-sm text-white">{entity.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gray-700"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <button
            onClick={resetConversation}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Zone de messages */}
        <div className="flex-1 p-4 space-y-4">
          {/* Bouton Nouvelle Conversation */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Chat</h1>
            <button
              onClick={startNewConversation}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
            >
              <PlusCircle size={16} className="text-blue-400" />
              Nouvelle Conversation
            </button>
          </div>

          {selectedEntities.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center space-y-4">
                <div className="text-4xl">✨</div>
                <div className=' border border-dashed border-gray-800 p-10 rounded-lg'>
                  <div className="text-xl font-medium text-white mb-2">Bienvenue sur ITM AI</div>
                  <div className="text-sm">Sélectionnez une capsule pour commencer à poser des questions</div>
                </div>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4 text-gray-400">
                <div className="text-4xl">💭</div>
                <div>
                  <div className="text-xl font-medium text-white mb-2">Démarrer une conversation</div>
                  <div className="text-sm">Commencez par écrire un message ci-dessous ou choisissez une suggestion</div>
                </div>
              </div>

              {showPrompts && (
                <div className={`${wrapperStyles} prompt-container`}>
                  <div className="relative">
                    {defaultPrompts
                      .reduce((pairs, item, index, array) => {
                        if (index % 2 === 0) {
                          pairs.push(array.slice(index, index + 2));
                        }
                        return pairs;
                      }, [] as DefaultPrompt[][])
                      .map((pair, pairIndex) => (
                        <React.Fragment key={pairIndex}>
                          {pair.map((prompt, index) => (
                            <div
                              key={prompt.id}
                              style={{
                                display: pairIndex === currentPromptPair ? 'block' : 'none',
                                position: 'relative'
                              }}
                            >
                              <button
                                onClick={() => {
                                  handleDefaultPrompt(prompt);
                                  setShowPrompts(false);
                                }}
                                className={index === 0 ? firstPromptStyles.containerClassName : secondPromptStyles.containerClassName}
                              >
                                <p className={index === 0 ? firstPromptStyles.textClassName : secondPromptStyles.textClassName}>
                                  {prompt.text}
                                </p>
                              </button>
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => sendMessage()}
              disabled={!inputMessage.trim() || selectedEntities.length === 0}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-blue-400" />
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
