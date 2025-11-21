import React from 'react';
import { ViewState } from '../types';
import { Search } from 'lucide-react';

interface HeaderProps {
  activeTab: ViewState;
  onTabChange: (tab: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: ViewState.HOME, label: 'Início' },
    { id: ViewState.RESOURCES, label: 'O Elefante' }, // Mapped conceptually
    { id: ViewState.RESOURCES, label: 'Recursos' },
    { id: ViewState.LOGIN, label: 'Cadastre-se' },
    { id: ViewState.HELP, label: 'Ajuda' },
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      {/* Top Bar with Logo */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
           {/* Modernized Elefante Logo */}
          <div className="w-10 h-10 bg-elefante-red rounded-lg flex items-center justify-center shadow-lg transform -rotate-3">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white w-6 h-6">
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M4 21V12a8 8 0 0 1 8-8c4.418 0 8 3.582 8 8v9l-4-4-4 4-4-4-4 4Z" />
             </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight leading-none">
              elefante<span className="text-elefante-red">.ai</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">seu assistente pessoal inteligente</p>
          </div>
        </div>
        
        {/* Search Bar (Modern addition) */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 border border-gray-200">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar recurso..." 
            className="bg-transparent border-none focus:outline-none text-sm text-gray-600 placeholder-gray-400 w-48"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-b border-gray-300">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1">
            {tabs.map((tab, idx) => (
              <button
                key={`${tab.id}-${idx}`}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-6 py-2 text-sm font-medium rounded-t-lg border-t border-x border-transparent relative top-[1px] transition-all
                  ${activeTab === tab.id 
                    ? 'bg-white text-elefante-red border-gray-300 border-b-white shadow-sm z-10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;