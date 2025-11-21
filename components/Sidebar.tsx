import React from 'react';
import { 
  Calendar, Gift, Users, RefreshCw, Bell, Mail, 
  CreditCard, CheckSquare, StickyNote, HardDrive, Star, 
  CloudSun, Moon, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { icon: Calendar, label: 'Compromissos e Finanças' },
    { icon: Gift, label: 'Aniversários' },
    { icon: Users, label: 'Contatos' },
    { icon: RefreshCw, label: 'Sincronização' },
    { icon: Bell, label: 'Lembretes' },
    { icon: Mail, label: 'Gmail' },
    { icon: CreditCard, label: 'Cartões Virtuais' },
    { icon: CheckSquare, label: 'Tarefas' },
    { icon: StickyNote, label: 'Notas' },
    { icon: HardDrive, label: 'Disco Virtual' },
    { icon: Star, label: 'Favoritos' },
    { icon: CloudSun, label: 'Previsão do Tempo' },
    { icon: Moon, label: 'Horóscopo Diário' },
  ];

  return (
    <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      {/* Header of Sidebar */}
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <h2 className="font-bold text-gray-700 flex items-center text-sm uppercase tracking-wide">
          <span className="w-2 h-4 bg-elefante-red mr-2 rounded-sm"></span>
          Menu Principal
        </h2>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => onChangeView(ViewState.RESOURCES)}
                className={`w-full flex items-center px-4 py-2 text-sm transition-colors hover:bg-red-50 hover:text-elefante-red group ${currentView === ViewState.RESOURCES ? 'text-elefante-red font-medium bg-red-50' : 'text-gray-600'}`}
              >
                <item.icon size={16} className="mr-3 text-gray-400 group-hover:text-elefante-red" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Google Profile / Connected State */}
      <div className="p-4 bg-blue-50 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            VC
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-800 truncate">Você</p>
            <p className="text-xs text-gray-500 truncate">voce@gmail.com</p>
          </div>
        </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs bg-white p-2 rounded border border-blue-100">
                <span className="flex items-center text-gray-600">
                    <ShieldCheck size={12} className="mr-1 text-green-500"/> Conta Google
                </span>
                <span className="text-green-600 font-medium">Ativa</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-white p-2 rounded border border-blue-100">
                <span className="flex items-center text-gray-600">
                    <RefreshCw size={12} className="mr-1 text-blue-500"/> Sincronização
                </span>
                <span className="text-blue-600 font-medium">Auto</span>
            </div>
        </div>

        <div className="mt-3 pt-3 border-t border-blue-100 text-center">
             <p className="text-[10px] text-gray-400 uppercase tracking-wider">Google Workspace Integrado</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;