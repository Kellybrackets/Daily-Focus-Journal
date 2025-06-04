import React from 'react';
import { useJournal } from '../context/JournalContext';
import { EntryType } from '../types';
import { Search, Filter } from 'lucide-react';

const SearchFilter: React.FC = () => {
  const { searchTerm, setSearchTerm, filterType, setFilterType } = useJournal();

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search entries..."
            className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">Filter:</span>
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as EntryType | 'All')}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800
                      text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Goal">Goals</option>
            <option value="Reflection">Reflections</option>
            <option value="Bible Verse">Bible Verses</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;