import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface BrandedMultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

export const BrandedMultiSelect: React.FC<BrandedMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const clearAll = () => onChange([]);

  return (
    <div className="w-full relative" ref={ref}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <button
        type="button"
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-left flex flex-wrap gap-2 items-center min-h-[42px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm ${open ? 'ring-2 ring-blue-400' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {value.map(val => {
              const opt = options.find(o => o.value === val);
              return (
                <span key={val} className="inline-flex items-center bg-blue-100 text-blue-700 rounded-md px-1.5 py-0.5 text-[11px] font-medium mr-1 h-5 min-w-[18px]">
                  {opt?.label || val}
                  <button
                    type="button"
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={e => {
                      e.stopPropagation();
                      toggleOption(val);
                    }}
                    aria-label={`Remove ${opt?.label || val}`}
                    style={{ lineHeight: 1 }}
                  >
                    &times;
                  </button>
                </span>
              );
            })}
            <button
              type="button"
              className="ml-2 text-xs text-gray-500 hover:text-red-600 underline"
              onClick={e => {
                e.stopPropagation();
                clearAll();
              }}
              aria-label="Clear all"
            >
              Clear
            </button>
          </div>
        )}
        <span className="ml-auto text-gray-400">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 z-30 mt-1 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto animate-fadeIn" role="listbox">
          {options.length === 0 && (
            <li className="px-4 py-2 text-gray-400">No options</li>
          )}
          {options.map(opt => (
            <li
              key={opt.value}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors ${value.includes(opt.value) ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
              onClick={() => toggleOption(opt.value)}
              role="option"
              aria-selected={value.includes(opt.value)}
            >
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 