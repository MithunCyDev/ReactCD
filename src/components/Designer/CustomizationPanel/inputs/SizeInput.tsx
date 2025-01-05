import React from 'react';

interface SizeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function SizeInput({ label, value, onChange }: SizeInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 100px, 50%, auto"
        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}