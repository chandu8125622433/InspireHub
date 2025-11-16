import React from 'react';

// FIX: Update icon prop types to accept the 'style' attribute. All icons in this file are updated for consistency.
export const HeartIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

export const BoltIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const FireIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3-7.284 8.252 8.252 0 0 1 3.362 2.897Z" />
  </svg>
);

export const BeakerIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c.239.043.47.09.7.142A2.25 2.25 0 0 1 12 5.304v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M12 12.75h.008v.008H12v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18" />
  </svg>
);

export const LeafIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 21.75c-4.477 0-8.25-3.64-8.25-8.125 0-4.484 3.688-8.125 8.25-8.125 4.562 0 8.25 3.64 8.25 8.125 0 4.486-3.688 8.125-8.25 8.125Z M8.25 15.375c.621 1.25 2.13 2.25 3.82 2.25 1.69 0 3.198-1 3.82-2.25M11.25 11.25v6" />
  </svg>
);

export const RocketLaunchIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82a4 4 0 0 1 4.34-3.98l.6-2.02a1 1 0 0 1 1.98.6l-1.08 3.63Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.38 5.48a2.5 2.5 0 0 0-2.76 2.76l1.24 4.14a2.5 2.5 0 0 0 4.9 0l1.24-4.14a2.5 2.5 0 0 0-2.76-2.76Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m18 15.5-1.12-3.74" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 15.5 1.12-3.74" />
  </svg>
);

export const GlobeAltIcon: React.FC<{className?: string; style?: React.CSSProperties}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 0a9 9 0 0 0 8.25 9m8.25-9a9 9 0 0 1-8.25 9m0-9a9 9 0 0 0-8.25-9m8.25 9a9 9 0 0 1 8.25-9" />
  </svg>
);
