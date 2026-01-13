import { Search, Upload } from 'lucide-react';
import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onFileUpload: (file: File) => void;
}

export function SearchInput({ onSearch, onFileUpload }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="w-full flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your query for Bedrock..."
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-purple-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm"
          />
        </div>
        <div>
          <input
            type="file"
            id="file-upload-button"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt"
          />
          <label
            htmlFor="file-upload-button"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-lg cursor-pointer hover:from-cyan-500 hover:to-purple-500 transition-all shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload</span>
          </label>
        </div>
      </form>
    </div>
  );
}
