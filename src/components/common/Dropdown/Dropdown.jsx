import React, { useState, useRef, useEffect } from 'react';

export function Dropdown({ 
  trigger, 
  items,
  align = 'left',
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignmentStyles = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`
          absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
          ${alignmentStyles[align]}
          ${className}
        `}>
          <div className="py-1" role="menu">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`
                  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer
                  ${item.className || ''}
                `}
                role="menuitem"
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}