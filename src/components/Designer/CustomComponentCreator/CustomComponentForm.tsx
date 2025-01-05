import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CustomComponentFormProps {
  onCreateComponent: (name: string) => void;
}

export function CustomComponentForm({ onCreateComponent }: CustomComponentFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateComponent(name);
      setName('');
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center gap-1 px-1.5 py-0.5 text-xs rounded
          bg-purple-400/10 hover:bg-purple-400/20
          border border-purple-400/30 hover:border-purple-400/50
          transition-all duration-200"
      >
        <Plus className="w-3 h-3" />
        <span>New</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="absolute top-0 right-0 z-10 w-64 p-4 
      backdrop-blur-md bg-gray-800/90 rounded-lg border border-purple-400/30 shadow-xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Component Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="MyComponent"
            className="w-full bg-gray-700/50 border border-purple-400/30 rounded
              px-3 py-2 text-sm text-gray-100 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-purple-400/20 hover:bg-purple-400/30 
              text-purple-100 px-3 py-1 rounded text-sm transition-colors"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-3 py-1 bg-gray-700/50 hover:bg-gray-700/70 
              text-gray-300 rounded text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}