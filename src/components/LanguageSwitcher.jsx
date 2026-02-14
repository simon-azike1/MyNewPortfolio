import React, { useEffect, useRef, useState } from 'react';

const LanguageIcon = ({ code }) => {
  switch (code) {
    case 'fr':
      return (
        <svg viewBox="0 0 36 24" className="h-4 w-6 rounded-sm shadow-sm" aria-hidden="true">
          <rect width="12" height="24" x="0" y="0" fill="#1d4ed8" />
          <rect width="12" height="24" x="12" y="0" fill="#ffffff" />
          <rect width="12" height="24" x="24" y="0" fill="#dc2626" />
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 36 24" className="h-4 w-6 rounded-sm shadow-sm" aria-hidden="true">
          <rect width="36" height="24" fill="#dc2626" />
          <rect width="36" height="12" y="6" fill="#facc15" />
        </svg>
      );
    case 'en':
    default:
      return (
        <svg viewBox="0 0 36 24" className="h-4 w-6 rounded-sm shadow-sm" aria-hidden="true">
          <rect width="36" height="24" fill="#b91c1c" />
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} width="36" height="2" y={i * 4 + 2} fill="#ffffff" />
          ))}
          <rect width="14" height="10" fill="#1d4ed8" />
        </svg>
      );
  }
};

const LanguageSwitcher = ({ value, onChange, label, fullWidth = false }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' }
  ];

  const current = options.find((option) => option.value === value) || options[0];

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={label}
        aria-expanded={open}
        className={`flex items-center justify-between gap-3 rounded-lg border border-theme bg-theme-bg-secondary px-3 py-2 text-sm text-theme-text-primary shadow-sm transition-colors hover:bg-theme-bg-tertiary ${fullWidth ? 'w-full' : ''}`}
      >
        <span className="flex items-center gap-2">
          <LanguageIcon code={current.value} />
          <span className="font-medium">{current.label}</span>
        </span>
        <svg viewBox="0 0 20 20" className={`h-4 w-4 text-theme-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-theme bg-theme-card p-2 shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                option.value === value
                  ? 'bg-theme-bg-secondary text-theme-accent-primary'
                  : 'text-theme-text-secondary hover:bg-theme-bg-secondary hover:text-theme-text-primary'
              }`}
            >
              <LanguageIcon code={option.value} />
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
