import React from 'react';
import { Repository } from './types';

interface RepositoryCardProps {
  repository: Repository;
  onClick?: () => void;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository, onClick }) => {
  return (
    <div
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 p-5 cursor-pointer border border-gray-100 hover:-translate-y-1 group"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${repository.name}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {repository.primaryLanguageIcon && (
          <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
            <img
              src={repository.primaryLanguageIcon}
              alt={repository.primaryLanguage}
              className="w-6 h-6"
            />
          </span>
        )}
        <span className="font-bold text-lg text-gray-900 truncate flex-1">{repository.name}</span>
      </div>
      <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 rounded px-2 py-0.5 mb-2">
        {repository.teamOwner}
      </span>
      <div className="text-sm text-gray-600 mt-1 line-clamp-2 min-h-[2.5em]">
        {repository.summary}
      </div>
      {/* Animated overlay on hover for summary */}
      <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 rounded-2xl transition-opacity z-10 pointer-events-none">
        <span className="text-gray-700 text-center text-base font-medium">{repository.summary}</span>
      </div>
    </div>
  );
}; 