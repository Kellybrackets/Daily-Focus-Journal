import { JournalEntry } from '../types';

const STORAGE_KEY = 'daily-focus-journal-entries';

export const saveEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const loadEntries = (): JournalEntry[] => {
  const storedEntries = localStorage.getItem(STORAGE_KEY);
  return storedEntries ? JSON.parse(storedEntries) : [];
};