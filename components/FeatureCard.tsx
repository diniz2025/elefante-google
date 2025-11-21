import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  color?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, color, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-elefante-red transition-all group text-left w-full"
    >
      <div className={`p-3 rounded-full ${color || 'bg-gray-100'} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className="text-gray-700" />
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-gray-700 group-hover:text-elefante-red transition-colors">{title}</h3>
      </div>
    </button>
  );
};

export default FeatureCard;