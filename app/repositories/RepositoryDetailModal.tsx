import React from 'react';
import { Repository } from './types';

interface RepositoryDetailModalProps {
  repository: Repository;
  onClose: () => void;
}

export const RepositoryDetailModal: React.FC<RepositoryDetailModalProps> = ({ repository, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fadeIn flex flex-col gap-4 z-10">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold rounded-full w-9 h-9 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={onClose}
          aria-label="Close details"
        >
          &times;
        </button>
        <div className="flex items-center gap-4 mb-2">
          {repository.primaryLanguageIcon && (
            <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
              <img
                src={repository.primaryLanguageIcon}
                alt={repository.primaryLanguage}
                className="w-6 h-6"
              />
            </span>
          )}
          <h2 className="text-2xl font-bold text-gray-900 flex-1">{repository.name}</h2>
        </div>
        <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 rounded px-2 py-0.5 mb-1">
          {repository.teamOwner}
        </span>
        <div className="text-gray-700 text-base mb-2">{repository.summary}</div>
        <a
          href={repository.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-medium mb-2 hover:text-blue-800 transition"
        >
          View Source Repository
        </a>
        <div>
          <h3 className="font-semibold mb-1 text-gray-800">Dependencies</h3>
          <ul className="list-disc list-inside max-h-32 overflow-y-auto text-sm text-gray-700 pl-2">
            {repository.dependencies.map((dep) => (
              <li key={dep.name}>
                {dep.name} <span className="text-gray-500">({dep.version})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 