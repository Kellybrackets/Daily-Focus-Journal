export type EntryType = 'Goal' | 'Reflection' | 'Bible Verse';

export interface JournalEntry {
  id: string;
  title: string;
  type: EntryType;
  notes: string;
  date: string; // ISO date string
  createdAt: string; // ISO datetime string
}