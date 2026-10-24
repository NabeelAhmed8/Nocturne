import { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ isOpen, searchQuery, onSearchChange, onSearchSubmit }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="border-t border-neutral-800 bg-[#070707] py-4 px-4 sm:px-6 lg:px-8 animate-in slide-in-from-top-2 duration-200">
      <form onSubmit={onSearchSubmit} className="max-w-3xl mx-auto flex items-center space-x-3">
        <Search className="w-5 h-5 text-neutral-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search collections (e.g. trench, wool, hoodie, trouser)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-light"
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-white text-black text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
