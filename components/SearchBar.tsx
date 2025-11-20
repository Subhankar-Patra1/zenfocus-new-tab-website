import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const fetchSuggestions = async () => {
        try {
          // Use proxy in development to avoid CORS, direct URL in production (extension)
          const isDev = import.meta.env.DEV;
          const baseUrl = isDev 
            ? '/suggest' 
            : 'https://suggestqueries.google.com/complete/search';
            
          console.log('Fetching suggestions from:', baseUrl);
          const response = await fetch(`${baseUrl}?client=firefox&q=${encodeURIComponent(query)}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Suggestions data:', data);
          setSuggestions(data[1] || []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      };
      
      const timeoutId = setTimeout(fetchSuggestions, 200);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-md z-40 transition-all duration-500 ${
          isFocused ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Search Bar Container */}
      <div 
        ref={containerRef}
        className={`relative z-50 transition-all duration-500 ease-out transform ${
          isFocused ? 'scale-110' : 'scale-100'
        }`}
      >
        <form 
          onSubmit={handleSubmit}
          className={`
          flex items-center w-[500px] max-w-[90vw] h-12 px-4 
          bg-[#202124] border border-gray-600/50 shadow-2xl
          ${isFocused && suggestions.length > 0 ? 'rounded-t-3xl rounded-b-none border-b-0' : 'rounded-full'}
        `}>
           {/* Google Icon */}
           <div className="mr-3 flex-shrink-0">
             <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
           </div>

           <input
             ref={inputRef}
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onFocus={() => setIsFocused(true)}
             placeholder="Search the web"
             className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 text-base h-full font-sans"
           />

           {/* Clear/Search Icon */}
           {query && (
             <div className="mr-2 text-gray-500 cursor-pointer hover:text-white" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
               <X size={18} />
             </div>
           )}
           <div className="text-gray-500 cursor-pointer hover:text-white" onClick={() => handleSearch(query)}>
             <Search size={20} />
           </div>
        </form>

        {/* Suggestions Dropdown */}
        {isFocused && (suggestions.length > 0) && (
           <div className="absolute top-full left-0 right-0 bg-[#202124] rounded-b-3xl border border-t-0 border-gray-600/50 overflow-hidden shadow-2xl pb-2">
             <div className="h-[1px] bg-gray-700 mx-4 mb-2 opacity-50"></div>
             {suggestions.map((suggestion, index) => (
               <div 
                 key={index}
                 className="px-4 py-2.5 hover:bg-[#303134] cursor-pointer flex items-center text-gray-300 transition-colors"
                 onClick={() => handleSearch(suggestion)}
               >
                 <Search size={16} className="mr-4 text-gray-500" />
                 <span className="font-sans text-sm">{suggestion}</span>
               </div>
             ))}
           </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
