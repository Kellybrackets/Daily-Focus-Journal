import React from 'react';
import { useJournal } from '../context/JournalContext';
import EntryCard from './EntryCard';
import { getTodayISODate, isSameDay } from '../utils/dateUtils';
import { CalendarCheck } from 'lucide-react';
import DailyReminder from './DailyReminder';

const EntryList: React.FC = () => {
  const { entries, searchTerm, filterType } = useJournal();
  const todayISODate = getTodayISODate();

  // Check if there's an entry for today
  const hasTodayEntry = entries.some(entry => isSameDay(entry.date, todayISODate));

  // Filter entries based on search term and filter type
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || entry.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Sort entries by date (newest first)
  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedEntries.length === 0) {
    return (
      <div className="mt-6">
        {!hasTodayEntry && <DailyReminder />}
        <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
          <CalendarCheck className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium mb-2">No entries found</p>
          <p className="text-sm text-center">
            {searchTerm || filterType !== 'All'
              ? 'Try adjusting your search or filter'
              : 'Create your first journal entry to get started'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {!hasTodayEntry && <DailyReminder />}
      <div className="grid gap-4">
        {sortedEntries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default EntryList;