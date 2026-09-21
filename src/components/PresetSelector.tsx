import React from 'react';
import type { PersonaProfile } from '../types';
import { GraduationCap, Compass, Briefcase, BookOpen, User } from 'lucide-react';

interface PresetSelectorProps {
  presets: PersonaProfile[];
  selectedPresetId: string;
  onSelectPreset: (preset: PersonaProfile) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={18} />;
      case 'Compass':
        return <Compass size={18} />;
      case 'Briefcase':
        return <Briefcase size={18} />;
      case 'BookOpen':
        return <BookOpen size={18} />;
      default:
        return <User size={18} />;
    }
  };

  return (
    <section className="presets-section">
      <div className="section-label">
        <User size={14} />
        <span>1. Perfiles de Contexto Real (Persona)</span>
      </div>

      <div className="preset-cards-grid">
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              className={`preset-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset)}
            >
              <div className="preset-card-header">
                <div className="preset-icon-box">{getIcon(preset.avatarIcon)}</div>
                <div className="preset-card-title">{preset.label}</div>
              </div>
              <p className="preset-card-desc">{preset.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
