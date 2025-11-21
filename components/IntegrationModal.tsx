import React, { useState, useEffect } from 'react';
import { X, Loader2, Mail, HardDrive, Calendar, Users, FileText, Folder, Phone, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { IntegrationType, GoogleEmail, GoogleEvent, GoogleFile, GoogleContact } from '../types';
import { fetchSimulatedGoogleData } from '../services/geminiService';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: IntegrationType | null;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose, type }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && type) {
      loadData(type);
    } else {
      setData([]);
    }
  }, [isOpen, type]);

  const loadData = async (integrationType: IntegrationType) => {
    setLoading(true);
    const result = await fetchSimulatedGoogleData(integrationType);
    setData(result);
    setLoading(false);
  };

  if (!isOpen || !type) return null;

  const getHeader = () => {
    switch (type) {
      case IntegrationType.GMAIL:
        return { icon: Mail, color: 'bg-red-600', title: 'Gmail - Entrada' };
      case IntegrationType.DRIVE:
        return { icon: HardDrive, color: 'bg-blue-600', title: 'Google Drive - Meus Arquivos' };
      case IntegrationType.CALENDAR:
        return { icon: Calendar, color: 'bg-green-600', title: 'Google Agenda' };
      case IntegrationType.CONTACTS:
        return { icon: Users, color: 'bg-yellow-600', title: 'Meus Contatos Google' };
      default:
        return { icon: Mail, color: 'bg-gray-600', title: 'Integração' };
    }
  };

  const header = getHeader();
  const HeaderIcon = header.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className={`${header.color} p-4 flex justify-between items-center text-white`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
                <HeaderIcon size={20} />
            </div>
            <div>
                <h2 className="text-lg font-semibold">{header.title}</h2>
                <p className="text-xs text-white/80">Sincronizado com voce@gmail.com</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 size={40} className={`animate-spin ${header.color.replace('bg-', 'text-')}`} />
              <p className="text-gray-500 text-sm">Sincronizando dados...</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              
              {type === IntegrationType.GMAIL && (
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 shadow-sm">
                    {data.map((email: GoogleEmail) => (
                        <div key={email.id} className="p-4 hover:bg-gray-50 cursor-pointer transition">
                            <div className="flex justify-between mb-1">
                                <span className={`font-semibold text-sm ${!email.read ? 'text-black' : 'text-gray-600'}`}>{email.from}</span>
                                <span className="text-xs text-gray-400">{email.date}</span>
                            </div>
                            <h4 className={`text-sm mb-1 ${!email.read ? 'font-bold text-gray-900' : 'font-normal text-gray-700'}`}>
                                {email.subject}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{email.snippet}</p>
                        </div>
                    ))}
                </div>
              )}

              {type === IntegrationType.DRIVE && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.map((file: GoogleFile) => (
                        <div key={file.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer flex flex-col items-center text-center gap-3">
                            {file.type === 'folder' ? (
                                <Folder size={40} className="text-gray-500 fill-gray-500/20" />
                            ) : (
                                <FileText size={40} className="text-blue-500" />
                            )}
                            <div className="w-full">
                                <p className="text-sm font-medium text-gray-700 truncate w-full">{file.name}</p>
                                <p className="text-xs text-gray-400 mt-1">{file.modified}</p>
                            </div>
                        </div>
                    ))}
                </div>
              )}

              {type === IntegrationType.CONTACTS && (
                 <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {data.map((contact: GoogleContact) => (
                        <div key={contact.id} className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full bg-gray-100 mr-3" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{contact.name}</p>
                                <p className="text-xs text-gray-500">{contact.email}</p>
                            </div>
                            <button className="text-gray-400 hover:text-green-600">
                                <Phone size={18} />
                            </button>
                        </div>
                    ))}
                 </div>
              )}

              {type === IntegrationType.CALENDAR && (
                  <div className="space-y-3">
                    {data.map((event: GoogleEvent) => (
                        <div key={event.id} className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm flex gap-4">
                            <div className="flex flex-col items-center justify-center px-2 border-r border-gray-100 text-gray-500">
                                <span className="text-xs uppercase font-bold">{event.date.split('/')[1] === '05' ? 'MAI' : 'MES'}</span>
                                <span className="text-xl font-bold text-black">{event.date.split('/')[0]}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800">{event.title}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center"><Clock size={12} className="mr-1"/> {event.time}</span>
                                    <span className="flex items-center"><MapPin size={12} className="mr-1"/> {event.location}</span>
                                </div>
                                <div className="mt-2 flex -space-x-2">
                                    {event.attendees?.map((person, i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[10px] text-indigo-800 font-bold" title={person}>
                                            {person.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
              )}

            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
            <span>Última sincronização: Agora mesmo</span>
            <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 size={12}/> Conectado</span>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;