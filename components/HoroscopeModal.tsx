import React, { useState, useEffect } from 'react';
import { X, Sparkles, Moon } from 'lucide-react';
import { generateHoroscope } from '../services/geminiService';

interface HoroscopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const signs = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer', 
  'Leão', 'Virgem', 'Libra', 'Escorpião', 
  'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

const HoroscopeModal: React.FC<HoroscopeModalProps> = ({ isOpen, onClose }) => {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSignSelect = async (sign: string) => {
    setSelectedSign(sign);
    setLoading(true);
    const text = await generateHoroscope(sign);
    setHoroscope(text);
    setLoading(false);
  };

  const reset = () => {
    setSelectedSign(null);
    setHoroscope('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-indigo-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Moon size={20} className="text-yellow-300" />
            <h2 className="text-lg font-semibold">Horóscopo IA</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded p-1 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!selectedSign ? (
            <>
              <p className="text-center text-gray-600 mb-6">Escolha seu signo para consultar a previsão de hoje:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {signs.map((sign) => (
                  <button
                    key={sign}
                    onClick={() => handleSignSelect(sign)}
                    className="p-2 rounded border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-sm font-medium transition-colors"
                  >
                    {sign}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center justify-center gap-2">
                {selectedSign} <Sparkles className="text-yellow-500" size={24} />
              </h3>
              
              {loading ? (
                <div className="py-8 space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  <p className="text-sm text-gray-400 mt-4">Consultando os astros via Gemini...</p>
                </div>
              ) : (
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-inner">
                  <p className="text-gray-800 leading-relaxed text-lg font-serif italic">
                    "{horoscope}"
                  </p>
                </div>
              )}

              <button 
                onClick={reset}
                className="mt-6 text-sm text-gray-500 hover:text-indigo-600 underline"
              >
                Escolher outro signo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoroscopeModal;