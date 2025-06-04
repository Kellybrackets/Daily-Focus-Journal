import React, { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import { EntryType } from '../types';
import { getTodayISODate } from '../utils/dateUtils';
import { PenLine, BookOpen, Target, PlusCircle } from 'lucide-react';

const EntryForm: React.FC = () => {
  const { addEntry } = useJournal();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EntryType>('Goal');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(getTodayISODate());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEntry({
      title,
      type,
      notes,
      date
    });

    // Reset form
    setTitle('');
    setNotes('');
    setDate(getTodayISODate());
    setIsOpen(false);
  };

  const getTypeIcon = (entryType: EntryType) => {
    switch (entryType) {
      case 'Goal':
        return <Target className="h-5 w-5" />;
      case 'Reflection':
        return <PenLine className="h-5 w-5" />;
      case 'Bible Verse':
        return <BookOpen className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 w-full">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg 
                    flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 
                    text-lg font-medium"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create New Entry</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 animate-[fadeIn_0.3s_ease-in-out]">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">New Journal Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What's your focus today?"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Goal', 'Reflection', 'Bible Verse'] as EntryType[]).map(entryType => (
                  <button
                    key={entryType}
                    type="button"
                    onClick={() => setType(entryType)}
                    className={`p-2 flex items-center justify-center gap-2 rounded-md transition-colors
                              ${
                                type === entryType
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                              }`}
                  >
                    {getTypeIcon(entryType)}
                    <span>{entryType}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Enter your thoughts..."
                rows={4}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300
                          rounded-md hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntryForm;