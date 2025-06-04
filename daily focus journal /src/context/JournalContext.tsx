import React, { createContext, useContext, useEffect, useState } from 'react';
import { JournalEntry, EntryType } from '../types';
import { loadEntries, saveEntries } from '../utils/storage';
import { getTodayISODate } from '../utils/dateUtils';

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (entry: JournalEntry) => void;
  deleteEntry: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: EntryType | 'All';
  setFilterType: (type: EntryType | 'All') => void;
  streakCount: number;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<EntryType | 'All'>('All');
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    const loadedEntries = loadEntries();
    setEntries(loadedEntries);
    calculateStreak(loadedEntries);
  }, []);

  useEffect(() => {
    saveEntries(entries);
    calculateStreak(entries);
  }, [entries]);

  const calculateStreak = (entryList: JournalEntry[]) => {
    if (entryList.length === 0) {
      setStreakCount(0);
      return;
    }

    // Sort entries by date in descending order
    const sortedEntries = [...entryList].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Check if there's an entry for today
    const todayEntry = sortedEntries.find(
      entry => new Date(entry.date).toDateString() === currentDate.toDateString()
    );

    if (!todayEntry) {
      // Check if there's an entry for yesterday
      currentDate.setDate(currentDate.getDate() - 1);
      const yesterdayEntry = sortedEntries.find(
        entry => new Date(entry.date).toDateString() === currentDate.toDateString()
      );

      if (!yesterdayEntry) {
        setStreakCount(0);
        return;
      }
    }

    // Start counting streak
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    while (true) {
      const hasEntryForDate = sortedEntries.some(
        entry => new Date(entry.date).toDateString() === checkDate.toDateString()
      );

      if (hasEntryForDate) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStreakCount(streak);
  };

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (updatedEntry: JournalEntry) => {
    setEntries(prev =>
      prev.map(entry => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        updateEntry,
        deleteEntry,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        streakCount
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};