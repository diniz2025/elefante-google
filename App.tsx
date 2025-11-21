import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeminiChat from './components/GeminiChat';
import FeatureCard from './components/FeatureCard';
import HoroscopeModal from './components/HoroscopeModal';
import IntegrationModal from './components/IntegrationModal';
import { ViewState, IntegrationType } from './types';
import { 
  Calendar, Gift, Users, RefreshCw, Bell, Mail, 
  CreditCard, CheckSquare, StickyNote, HardDrive, Star, 
  CloudSun, Moon 
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [isHoroscopeOpen, setIsHoroscopeOpen] = useState(false);
  const [integrationType, setIntegrationType] = useState<IntegrationType | null>(null);

  const handleHoroscopeClick = () => setIsHoroscopeOpen(true);
  const openIntegration = (type: IntegrationType) => setIntegrationType(type);
  const closeIntegration = () => setIntegrationType(null);

  const features = [
    { 
      icon: Calendar, 
      title: 'Compromissos e Finanças', 
      color: 'bg-blue-100 text-blue-600',
      action: () => openIntegration(IntegrationType.CALENDAR) 
    },
    { icon: Gift, title: 'Aniversários', color: 'bg-pink-100 text-pink-600' },
    { 
      icon: Users, 
      title: 'Contatos Google', 
      color: 'bg-green-100 text-green-600',
      action: () => openIntegration(IntegrationType.CONTACTS)
    },
    { icon: RefreshCw, title: 'Sincronização de Dados', color: 'bg-purple-100 text-purple-600' },
    { icon: Bell, title: 'Lembretes', color: 'bg-yellow-100 text-yellow-600' },
    { 
      icon: Mail, 
      title: 'Gmail', 
      color: 'bg-red-100 text-red-600',
      action: () => openIntegration(IntegrationType.GMAIL)
    }, 
    { icon: CreditCard, title: 'Cartões Virtuais', color: 'bg-orange-100 text-orange-600' },
    { icon: CheckSquare, title: 'Tarefas', color: 'bg-teal-100 text-teal-600' },
    { icon: StickyNote, title: 'Notas', color: 'bg-yellow-50 text-yellow-500' },
    { 
      icon: HardDrive, 
      title: 'Disco Virtual (Drive)', 
      color: 'bg-indigo-100 text-indigo-600',
      action: () => openIntegration(IntegrationType.DRIVE)
    },
    { icon: Star, title: 'Favoritos', color: 'bg-amber-100 text-amber-600' },
    { icon: CloudSun, title: 'Previsão do Tempo', color: 'bg-sky-100 text-sky-600' },
    { icon: Moon, title: 'Horóscopo Diário', color: 'bg-indigo-900 text-white', action: handleHoroscopeClick },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900">
      <Header activeTab={view} onTabChange={setView} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={view} onChangeView={setView} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            
            {/* Breadcrumb / Title Section */}
            <div className="mb-8 flex items-center border-b border-gray-200 pb-4">
              <img 
                src="https://picsum.photos/id/30/50/50" 
                alt="Resources Icon" 
                className="w-12 h-12 rounded-md mr-4 shadow-sm grayscale opacity-80"
              />
              <div>
                <h2 className="text-3xl font-bold text-elefante-red mb-1">Recursos</h2>
                <div className="flex items-center text-sm text-gray-500">
                   <span className="mr-2">Conta Google:</span>
                   <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Conectada</span>
                </div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
              <p className="text-lg font-medium text-gray-800 mb-2">
                Bem-vindo, Usuário. Sua vida digital está sincronizada.
              </p>
              <p className="text-gray-600 mb-4">
                O Elefante AI agora se conecta diretamente ao seu <strong className="text-elefante-red">Google Workspace</strong>.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Acesse seus emails, gerencie sua agenda, visualize arquivos do Drive e sincronize contatos diretamente daqui. Nossa Inteligência Artificial ajuda a organizar essas informações para você.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  color={feature.color}
                  onClick={feature.action}
                />
              ))}
            </div>

          </div>
          
          <footer className="mt-16 border-t border-gray-200 pt-8 pb-4 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Elefante AI. Todos os direitos reservados.
          </footer>
        </main>
      </div>

      {/* Floating AI Chat */}
      <GeminiChat />

      {/* Modals */}
      <HoroscopeModal isOpen={isHoroscopeOpen} onClose={() => setIsHoroscopeOpen(false)} />
      <IntegrationModal 
        isOpen={integrationType !== null} 
        onClose={closeIntegration} 
        type={integrationType} 
      />
    </div>
  );
};

export default App;