import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const NotebookLMLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#1A73E8" />
    <path d="M6 6H14C16.2091 6 18 7.79086 18 10V18H10C7.79086 18 6 16.2091 6 14V6Z" fill="#E8F0FE" />
    <circle cx="11" cy="11" r="2.5" fill="#1A73E8" />
    <rect x="8.5" y="14" width="5" height="1.5" rx="0.75" fill="#1A73E8" />
  </svg>
);

export const ChatGPTLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#10A37F" />
    <path
      d="M17.8 11.2C17.6 9.8 16.6 8.7 15.2 8.4C15 7 13.9 6 12.5 5.9C11.1 5.8 9.8 6.6 9.3 7.9C8 7.9 6.9 8.9 6.8 10.2C5.7 10.8 5.1 12 5.3 13.3C5.5 14.6 6.5 15.6 7.8 15.8C8 17.2 9.1 18.2 10.5 18.3C11.9 18.4 13.2 17.6 13.7 16.3C15 16.3 16.1 15.3 16.2 14C17.3 13.4 17.9 12.2 17.8 11.2Z"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClaudeLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#D97757" />
    <path
      d="M7 16.5L12 7.5L17 16.5M8.8 13.2H15.2"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PerplexityLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#20B2AA" />
    <path
      d="M12 4V20M4 12H20M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"
      stroke="#FFFFFF"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

export const ZoteroLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#CC292B" />
    <path d="M6 7H18L8 17H18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WolframLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#DD1100" />
    <path
      d="M12 3L14.5 8.5L20.5 9.5L16 14L17.5 20L12 17L6.5 20L8 14L3.5 9.5L9.5 8.5L12 3Z"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const GeoGebraLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#4B66B8" />
    <ellipse cx="12" cy="12" rx="7" ry="4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-25 12 12)" />
    <circle cx="9" cy="10" r="1.5" fill="#FFFFFF" />
    <circle cx="15" cy="14" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const JuliusAILogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#6366F1" />
    <path d="M7 17V7H11C13.2 7 15 8.8 15 11C15 13.2 13.2 15 11 15H7M12 12L17 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ExcelLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#107C41" />
    <path d="M8 8L16 16M16 8L8 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CanvaLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#00C4CC" />
    <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M9 13C9.5 14.5 11 15.5 12.5 15.5C14.5 15.5 15.5 14 15.5 12.5C15.5 10.5 13.5 9 11.5 9C9.5 9 8.5 10.5 8.5 12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const FigmaLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#1E1E1E" />
    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6H9V12H12Z" fill="#FF7262" />
    <path d="M9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12V6Z" fill="#F24E1E" />
    <path d="M9 12C7.34315 12 6 13.3431 6 15C6 16.6569 7.34315 18 9 18C10.6569 18 12 16.6569 12 15V12H9Z" fill="#0ACF83" />
    <path d="M9 18C7.34315 18 6 19.3431 6 21C6 22.6569 7.34315 24 9 24C10.6569 24 12 22.6569 12 21V18H9Z" fill="#A259FF" transform="translate(0 -6)" />
    <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
  </svg>
);

export const MidjourneyLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#1A1B26" />
    <path d="M6 18L12 6L18 18L15 15L12 17L9 15L6 18Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const VizcomLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#FF4B22" />
    <path d="M6 7L12 17L18 7M10 7L12 11L14 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArchiCADLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#005B94" />
    <path d="M6 18L12 6L18 18H14L12 13L10 18H6Z" fill="#FFFFFF" />
  </svg>
);

export const RhinoLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#555555" />
    <path d="M6 14C6 11 9 8 13 8C17 8 18 10 18 12C18 15 15 17 11 17L7 18L8 15" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="14" cy="11" r="1" fill="#FFFFFF" />
  </svg>
);

export const GammaLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#8B5CF6" />
    <path d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V11C17 12.1046 16.1046 13 15 13H10V18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PitchLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#FFCF00" />
    <path d="M8 6H13C15.2 6 17 7.8 17 10C17 12.2 15.2 14 13 14H8V6ZM8 14V18" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NotionLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#000000" />
    <path d="M7 6L15 6L17 8V18L15 18L9 9V18H7V6Z" fill="#FFFFFF" />
  </svg>
);

export const ObsidianLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#7C3AED" />
    <path d="M12 4L17 8L15 17L12 20L9 17L7 8L12 4Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const DescriptLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#2563EB" />
    <path d="M7 7H11C13.7614 7 16 9.23858 16 12C16 14.7614 13.7614 17 11 17H7V7Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const KreaLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#EC4899" />
    <circle cx="9" cy="9" r="3" fill="#FFFFFF" />
    <circle cx="15" cy="15" r="3" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

export const PowerBILogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#F2C811" />
    <rect x="6" y="13" width="3" height="6" fill="#111111" />
    <rect x="10.5" y="9" width="3" height="10" fill="#111111" />
    <rect x="15" y="5" width="3" height="14" fill="#111111" />
  </svg>
);

export const GenericToolLogo: React.FC<LogoProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="3" fill="#333333" />
    <path d="M12 7V17M7 12H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function getToolLogo(toolId: string, size = 20) {
  switch (toolId) {
    case 'notebooklm':
      return <NotebookLMLogo size={size} />;
    case 'chatgpt':
      return <ChatGPTLogo size={size} />;
    case 'claude':
      return <ClaudeLogo size={size} />;
    case 'perplexity':
      return <PerplexityLogo size={size} />;
    case 'zotero':
      return <ZoteroLogo size={size} />;
    case 'wolfram-alpha':
      return <WolframLogo size={size} />;
    case 'geogebra':
      return <GeoGebraLogo size={size} />;
    case 'julius-ai':
      return <JuliusAILogo size={size} />;
    case 'excel-copilot':
      return <ExcelLogo size={size} />;
    case 'canva':
      return <CanvaLogo size={size} />;
    case 'figma':
      return <FigmaLogo size={size} />;
    case 'midjourney':
      return <MidjourneyLogo size={size} />;
    case 'vizcom':
      return <VizcomLogo size={size} />;
    case 'archicad':
      return <ArchiCADLogo size={size} />;
    case 'rhino':
      return <RhinoLogo size={size} />;
    case 'gamma':
      return <GammaLogo size={size} />;
    case 'pitch':
      return <PitchLogo size={size} />;
    case 'notion':
      return <NotionLogo size={size} />;
    case 'obsidian':
      return <ObsidianLogo size={size} />;
    case 'descript':
      return <DescriptLogo size={size} />;
    case 'krea-ai':
      return <KreaLogo size={size} />;
    case 'power-bi':
      return <PowerBILogo size={size} />;
    default:
      return <GenericToolLogo size={size} />;
  }
}
