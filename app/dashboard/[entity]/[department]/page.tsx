'use client';

import { useState, useRef, useEffect, use } from 'react';
import { Send, Bot, User, Download, Share2, Calendar, Filter, BarChart2, Image } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'chart' | 'file';
    url: string;
    name: string;
  }[];
}

interface ChatOptions {
  timeRange: string;
  dataFilters: string[];
  visualizationType: string;
  exportFormat: string;
}

export default function DepartmentChat({ 
  params 
}: { 
  params: Promise<{ entity: string; department: string }> 
}) {
  const resolvedParams = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [chatOptions, setChatOptions] = useState<ChatOptions>({
    timeRange: 'last-30-days',
    dataFilters: [],
    visualizationType: 'auto',
    exportFormat: 'pdf'
  });

  const timeRanges = [
    { id: 'last-7-days', label: '7 derniers jours' },
    { id: 'last-30-days', label: '30 derniers jours' },
    { id: 'last-90-days', label: '90 derniers jours' },
    { id: 'year-to-date', label: 'Depuis le début de l\'année' },
    { id: 'custom', label: 'Personnalisé' }
  ];

  const visualizationTypes = [
    { id: 'auto', label: 'Automatique' },
    { id: 'table', label: 'Tableau' },
    { id: 'bar', label: 'Graphique à barres' },
    { id: 'line', label: 'Graphique linéaire' },
    { id: 'pie', label: 'Graphique circulaire' }
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF' },
    { id: 'excel', label: 'Excel' },
    { id: 'csv', label: 'CSV' },
    { id: 'json', label: 'JSON' }
  ];

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

    // Simuler une réponse de l'IA avec des visualisations
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'Voici les données demandées pour l\'entité ' + resolvedParams.entity,
        timestamp: new Date(),
        attachments: [
          {
            type: 'chart',
            url: '/sample-chart.png',
            name: 'Analyse des données'
          }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Options du chat */}
      <div className="border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Filter size={20} />
              <span>Options</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-500" />
              <select
                value={chatOptions.timeRange}
                onChange={(e) => setChatOptions({...chatOptions, timeRange: e.target.value})}
                className="border-none bg-transparent focus:outline-none"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Exporter">
              <Download size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Partager">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {showOptions && (
          <div className="p-4 bg-gray-50 border-t space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de visualisation
                </label>
                <select
                  value={chatOptions.visualizationType}
                  onChange={(e) => setChatOptions({...chatOptions, visualizationType: e.target.value})}
                  className="w-full border rounded-lg p-2"
                >
                  {visualizationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format d'export
                </label>
                <select
                  value={chatOptions.exportFormat}
                  onChange={(e) => setChatOptions({...chatOptions, exportFormat: e.target.value})}
                  className="w-full border rounded-lg p-2"
                >
                  {exportFormats.map(format => (
                    <option key={format.id} value={format.id}>{format.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zone de chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className="space-y-2 max-w-[70%]">
              <div
                className={`p-3 rounded-lg ${
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
              
              {message.attachments && (
                <div className="space-y-2">
                  {message.attachments.map((attachment, i) => (
                    <div key={i} className="bg-white border rounded-lg p-2">
                      {attachment.type === 'chart' && (
                        <div className="flex items-center gap-2">
                          <BarChart2 size={20} className="text-gray-500" />
                          <span>{attachment.name}</span>
                        </div>
                      )}
                      {attachment.type === 'image' && (
                        <div className="flex items-center gap-2">
                          <Image size={20} className="text-gray-500" />
                          <span>{attachment.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
            placeholder="Posez votre question..."
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
